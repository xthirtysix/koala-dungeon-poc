// import { authenticatedRequest } from '@/shared/api'
import type { Persisted } from '@/shared/model/persisted.type'
import type { Auction, AuctionItem } from '../model/auction.types'

export default {
    getAuction: async (nickname: string): Promise<Persisted<Auction>> => {
        // const response = await authenticatedRequest<{ data: Persisted<Auction> }>(
        //     `/auctions/${nickname}`,
        // )
        // return response.data
    },

    addItem: async (
        auctionItem: AuctionItem,
        auctionId: Persisted<Auction>['documentId'],
    ) => {
        // const response = await authenticatedRequest<{ data: any }>(
        //     `/auctions/${auctionId}`,
        //     {
        //         method: 'PUT',
        //         body: {
        //             data: auctionItem,
        //         },
        //     },
        // )
        // return response.data
    },

    deleteItem: async (
        itemId: number,
        auctionId: Persisted<Auction>['documentId'],
    ) => {
        // await authenticatedRequest(`/auctions/${auctionId}`, {
        //     method: 'PUT',
        //     body: {
        //         data: itemId,
        //     },
        // })
    },
}
