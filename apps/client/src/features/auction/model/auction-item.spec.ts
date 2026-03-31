import { afterEach, describe, expect, it, vi } from 'vitest'
import { useAuctionItem } from './auction-item.composable'
import type { AuctionItem } from '@/entities/auction/model/auction.types'
import type { Persisted } from '@/shared/model/persisted.type'

const LOCAL_AUCTION_ITEM: AuctionItem = {
    title: 'test item',
    amount: 0,
}

const DB_AUCTION_ITEM: Persisted<AuctionItem> = {
    id: 1,
    documentId: 'abc123',
    ...LOCAL_AUCTION_ITEM,
}

describe('Auction Item', () => {
    let auctionItem = useAuctionItem()
    const auctionItems = []

    afterEach(() => {
        vi.clearAllMocks()
        auctionItems.length = 0
    })

    it.todo('adds item to auction', async () => {
        await auctionItem.add(LOCAL_AUCTION_ITEM)

        expect(auctionItems.length).toBeTruthy()
    })
    it.todo('removes item from auction', async () => {
        auctionItems.push(DB_AUCTION_ITEM)
        await auctionItem.remove(DB_AUCTION_ITEM.id)

        expect(auctionItems.length).toBe(0)
    })
})
