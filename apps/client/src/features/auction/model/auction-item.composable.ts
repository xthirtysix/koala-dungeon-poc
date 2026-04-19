import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { AUCTION_QUERY_KEY, auctionApi } from '@/entities/auction'
import type {
    Auction,
    AuctionItem,
} from '@/entities/auction/model/auction.types'
import type { Persisted } from '@/shared/model/persisted.type'
import type { AuctionItemCreateParams } from './auction-item.types'
import { computed } from 'vue'

export function useAuctionItem() {
    const queryClient = useQueryClient()

    const { mutateAsync: createItem, status: createStatus } = useMutation({
        mutationFn({ auctionItem, auctionId }: AuctionItemCreateParams) {
            return auctionApi.addItem(auctionItem, auctionId)
        },
        onMutate({ auctionItem, auctionId }) {
            const newAuctionItem: Persisted<AuctionItem> = {
                ...auctionItem,
                id: Infinity,
                documentId: crypto.randomUUID(),
            }
            const auctionOld = queryClient.getQueryData<Persisted<Auction>>([
                AUCTION_QUERY_KEY,
                auctionId,
            ])!
            const auctionNew: Persisted<Auction> = {
                ...auctionOld,
                items: auctionOld.items?.concat(newAuctionItem),
            }
            queryClient.setQueryData([AUCTION_QUERY_KEY, auctionId], auctionNew)
            queryClient.cancelQueries({
                queryKey: [AUCTION_QUERY_KEY, auctionId],
            })

            return { auctionOld, auctionNew, newAuctionItem }
        },
        onError(_error, { auctionId }, context) {
            if (!context) return

            const { auctionOld, auctionNew } = context

            if (
                auctionNew ===
                queryClient.getQueryData([AUCTION_QUERY_KEY, auctionId])
            ) {
                queryClient.setQueryData(
                    [AUCTION_QUERY_KEY, auctionId],
                    auctionOld,
                )
            }
        },
        onSuccess(_, { auctionId }, { auctionNew, newAuctionItem }) {
            const auction = queryClient.getQueryData<Persisted<Auction>>([
                AUCTION_QUERY_KEY,
                auctionId,
            ])

            if (!auction) return

            if (!auction.items) {
                queryClient.setQueryData([AUCTION_QUERY_KEY], auctionNew)
                return
            }

            const auctionItemIndex = auction.items.findIndex(
                (i) => i.id === newAuctionItem.id,
            )

            if (auctionItemIndex !== -1) {
                const itemsCopy = auction?.items?.slice()
                itemsCopy?.splice(auctionItemIndex, 1, newAuctionItem)
                queryClient.setQueryData([AUCTION_QUERY_KEY, auctionId], {
                    ...auctionNew,
                    aution_items: itemsCopy ?? [],
                })
            }
        },
    })

    const { mutateAsync: deleteItem } = useMutation({
        mutationFn({
            itemId,
            auctionId,
        }: {
            itemId: AuctionItem['id']
            auctionId: Persisted<Auction>['documentId']
        }) {
            return auctionApi.deleteItem(itemId, auctionId)
        },
        onMutate({ itemId, auctionId }) {
            const auctionOld = queryClient.getQueryData<Persisted<Auction>>([
                AUCTION_QUERY_KEY,
                auctionId,
            ])
            if (!auctionOld) return

            const auctionNew: Persisted<Auction> = {
                ...auctionOld,
                items: auctionOld.items?.filter((item) => item.id !== itemId),
            }

            queryClient.setQueryData([AUCTION_QUERY_KEY, auctionId], auctionNew)
            queryClient.cancelQueries({
                queryKey: [AUCTION_QUERY_KEY, auctionId],
            })

            return { auctionOld }
        },
        onError(_error, { auctionId }, context) {
            if (!context) return

            queryClient.setQueryData(
                [AUCTION_QUERY_KEY, auctionId],
                context.auctionOld,
            )

            queryClient.invalidateQueries({
                queryKey: [AUCTION_QUERY_KEY, auctionId],
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
        return createStatus.value === 'pending'
    })

    return {
        create,
        remove: deleteItem,
        isCreating,
    }
}
