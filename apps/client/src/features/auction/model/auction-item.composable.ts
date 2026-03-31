import { useMutation, useQueryCache } from '@pinia/colada'
import { AUCTION_QUERY_KEY, auctionApi } from '@/entities/auction'
import type {
    Auction,
    AuctionItem,
} from '@/entities/auction/model/auction.types'
import type { Persisted } from '@/shared/model/persisted.type'
import type { AuctionItemCreateParams } from './auction-item.types'
import { computed } from 'vue'

export function useAuctionItem() {
    const queryCache = useQueryCache()

    const { mutateAsync: createItem, asyncStatus: createStatus } = useMutation({
        mutation({ auctionItem, auctionId }: AuctionItemCreateParams) {
            return auctionApi.addItem(auctionItem, auctionId)
        },
        onMutate({ auctionItem, auctionId }) {
            const newAuctionItem: Persisted<AuctionItem> = {
                ...auctionItem,
                id: Infinity,
                documentId: crypto.randomUUID(),
            }
            const auctionOld = queryCache.getQueryData<Persisted<Auction>>([
                AUCTION_QUERY_KEY,
                auctionId,
            ])!
            const auctionNew: Persisted<Auction> = {
                ...auctionOld,
                items: auctionOld.items?.concat(newAuctionItem),
            }
            queryCache.setQueryData([AUCTION_QUERY_KEY, auctionId], auctionNew)
            queryCache.cancelQueries({ key: [AUCTION_QUERY_KEY, auctionId] })

            return { auctionOld, auctionNew, newAuctionItem }
        },
        onError(_error, { auctionId }, { auctionOld, auctionNew }) {
            if (
                auctionNew ===
                queryCache.getQueryData([AUCTION_QUERY_KEY, auctionId])
            ) {
                queryCache.setQueryData(
                    [AUCTION_QUERY_KEY, auctionId],
                    auctionOld,
                )
            }
        },
        onSuccess(auctionItem, { auctionId }, { auctionNew, newAuctionItem }) {
            const auction = queryCache.getQueryData<Persisted<Auction>>([
                AUCTION_QUERY_KEY,
                auctionId,
            ])

            if (!auction) return

            if (!auction.items) {
                queryCache.setQueryData([AUCTION_QUERY_KEY], auctionNew)
                return
            }

            const auctionItemIndex = auction.items.findIndex(
                (i) => i.id === newAuctionItem.id,
            )

            if (auctionItemIndex !== -1) {
                const itemsCopy = auction?.items?.slice()
                itemsCopy.splice(auctionItemIndex, 1, auctionItem)
                queryCache.setQueryData([AUCTION_QUERY_KEY, auctionId], {
                    ...auctionNew,
                    aution_items: itemsCopy,
                })
            }
        },
    })

    const { mutateAsync: deleteItem } = useMutation({
        mutation({
            itemId,
            auctionId,
        }: {
            itemId: AuctionItem['id']
            auctionId: Persisted<Auction>['documentId']
        }) {
            return auctionApi.deleteItem(itemId, auctionId)
        },
        onMutate({ itemId, auctionId }) {
            const auctionOld = queryCache.getQueryData<Persisted<Auction>>([
                AUCTION_QUERY_KEY,
                auctionId,
            ])
            if (!auctionOld) return

            const auctionNew: Persisted<Auction> = {
                ...auctionOld,
                items: auctionOld.items?.filter((item) => item.id !== itemId),
            }

            queryCache.setQueryData([AUCTION_QUERY_KEY, auctionId], auctionNew)
            queryCache.cancelQueries({ key: [AUCTION_QUERY_KEY, auctionId] })

            return { auctionOld }
        },
        onError(_error, { auctionId }, context) {
            if (!context) return

            queryCache.setQueryData(
                [AUCTION_QUERY_KEY, auctionId],
                context.auctionOld,
            )

            queryCache.invalidateQueries({
                key: [AUCTION_QUERY_KEY, auctionId],
            })
        },
    })

    async function create({ auctionItem, auctionId }: AuctionItemCreateParams) {
        if (createStatus.value !== 'idle') {
            return
        }

        await createItem({ auctionItem, auctionId })
    }

    const isCreating = computed(() => {
        return createStatus.value === 'loading'
    })

    return {
        create,
        remove: deleteItem,
        isCreating,
    }
}
