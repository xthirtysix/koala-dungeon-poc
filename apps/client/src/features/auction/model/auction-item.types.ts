import type {
    Auction,
    AuctionItem,
} from '@/entities/auction/model/auction.types'
import type { Persisted } from '@/shared/model/persisted.type'

export type AuctionItemCreateParams = {
    auctionItem: AuctionItem
    auctionId: Persisted<Auction>['documentId']
}
