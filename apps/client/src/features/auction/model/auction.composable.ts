import { useRouter } from 'vue-router'
import { useMutation, useQueryCache } from '@pinia/colada'
import { auctionApi, AUCTION_QUERY_KEY, Auction } from '@/entities/auction'
import { Persisted } from '@/shared/model/persisted.type'

export function useAuction() {
    const queryCache = useQueryCache()
    const router = useRouter()

    const {
        mutateAsync,
        data,
        asyncStatus: createStatus,
    } = useMutation({
        mutation: () => {
            return auctionApi.createAuction()
        },
        onSettled: async () => {
            await queryCache.invalidateQueries({
                key: [AUCTION_QUERY_KEY],
                exact: true,
            })

            if (data.value?.documentId) {
                router.push({ path: `/auctions/${data.value?.documentId}` })
            }
        },
    })

    async function create() {
        if (createStatus.value === 'loading') {
            return
        }

        await mutateAsync()
    }

    const { mutate: updateTitle } = useMutation({
        mutation: (params: { auction: Persisted<Auction>; title: string }) => {
            return auctionApi.updateTitle(params.title, params.auction)
        },
        onMutate({ auction, title }) {
            const oldAuction = queryCache.getQueryData<Persisted<Auction>>([
                AUCTION_QUERY_KEY,
                auction.documentId,
            ])

            if (!oldAuction) {
                return
            }

            const newAuction: Persisted<Auction> = {
                ...oldAuction,
                title,
            }

            queryCache.setQueryData<Persisted<Auction>>(
                [AUCTION_QUERY_KEY, auction.documentId],
                newAuction,
            )
            queryCache.cancelQueries({
                key: [AUCTION_QUERY_KEY, auction.documentId],
            })

            return { oldAuction, newAuction }
        },
        onError(_error, { auction }, { newAuction, oldAuction }) {
            if (
                newAuction ===
                queryCache.getQueryData([AUCTION_QUERY_KEY, auction.documentId])
            ) {
                queryCache.setQueryData(
                    [AUCTION_QUERY_KEY, auction.documentId],
                    oldAuction,
                )
            }
        },
    })

    return {
        create,
        updateTitle,
        createStatus,
    }
}
