import type { User } from '@/entities/user'
import type { Persisted } from '@/shared/model/persisted.type'

export type Auction = {
    owner: Persisted<User>
    items?: AuctionItem[]
}

export type AuctionItem = {
    id: number
    title: string
    amount: number
}
