import { useRouter } from 'vue-router'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { auctionApi, AUCTION_QUERY_KEY, Auction } from '@/entities/auction'
import { Persisted } from '@/shared/model/persisted.type'

export function useAuction() {
    const queryClient = useQueryClient()
    const router = useRouter()

    const {
        mutateAsync,
        data,
        status: createStatus,
    } = useMutation({
        mutationFn: () => {
            return auctionApi.create()
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [AUCTION_QUERY_KEY],
                exact: true,
            })

            if (data.value?.documentId) {
                router.push({ path: `/auctions/${data.value?.documentId}` })
            }
        },
    })

    async function create() {
        if (createStatus.value === 'pending') {
            return
        }

        await mutateAsync()
    }

    const { mutate: updateTitle } = useMutation({
        mutationFn: (params: { auction: Persisted<Auction>; title: string }) => {
            return auctionApi.updateTitle(params.title, params.auction)
        },
        onMutate({ auction, title }) {
            const oldAuction = queryClient.getQueryData<Persisted<Auction>>([
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

            queryClient.setQueryData<Persisted<Auction>>(
                [AUCTION_QUERY_KEY, auction.documentId],
                newAuction,
            )
            queryClient.cancelQueries({
                queryKey: [AUCTION_QUERY_KEY, auction.documentId],
            })

            return { oldAuction, newAuction }
        },
        onError(_error, { auction }, context) {
            if (!context) return

            const { newAuction, oldAuction } = context

            if (
                newAuction ===
                queryClient.getQueryData([AUCTION_QUERY_KEY, auction.documentId])
            ) {
                queryClient.setQueryData(
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
