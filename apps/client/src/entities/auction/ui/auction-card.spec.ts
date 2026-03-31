import { it, afterEach, describe, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { U_CARD_STUB } from '@/shared/tests/tests.stubs'
import AuctionCard from './auction-card.vue'

const { routerPushMock } = vi.hoisted(() => ({
    routerPushMock: vi.fn(),
}))

const globalStubs = {
    stubs: {
        UCard: {
            template: U_CARD_STUB,
        },
    },
}

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: routerPushMock,
    }),
}))

describe('Auction Card', () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    it('paints active auction green', () => {
        const wrapper = mount(AuctionCard, {
            global: globalStubs,
            props: {
                item: {
                    id: 1,
                    documentId: 'abc123',
                    title: 'auction',
                    is_closed: false,
                    createdAt: new Date().toDateString(),
                },
            },
        })
        const auctionIndicatorDot = wrapper.find(
            '.auction-card__activity-dot',
        ).element
        const auctionIndicatorLabel = wrapper.find(
            '.auction-card__activity-label',
        ).element

        expect(auctionIndicatorDot.classList).toContain('bg-green-500')
        expect(auctionIndicatorLabel.classList).toContain('text-green-500')
        expect(auctionIndicatorDot.classList).not.toContain('bg-red-500')
        expect(auctionIndicatorLabel.classList).not.toContain('text-red-500')
    })

    it('paints completed auction red', () => {
        const wrapper = mount(AuctionCard, {
            global: globalStubs,
            props: {
                item: {
                    id: 1,
                    documentId: 'abc123',
                    title: 'auction',
                    is_closed: true,
                    createdAt: new Date().toDateString(),
                },
            },
        })
        const auctionIndicatorDot = wrapper.find(
            '.auction-card__activity-dot',
        ).element
        const auctionIndicatorLabel = wrapper.find(
            '.auction-card__activity-label',
        ).element

        expect(auctionIndicatorDot.classList).not.toContain('bg-green-500')
        expect(auctionIndicatorLabel.classList).not.toContain('text-green-500')
        expect(auctionIndicatorDot.classList).toContain('bg-red-500')
        expect(auctionIndicatorLabel.classList).toContain('text-red-500')
    })

    it('redirects to auction page on click', () => {
        const wrapper = mount(AuctionCard, {
            global: globalStubs,
            props: {
                item: {
                    id: 1,
                    documentId: 'abc123',
                    title: 'auction',
                    is_closed: false,
                    createdAt: new Date().toDateString(),
                },
            },
        })

        wrapper.trigger('click')

        expect(routerPushMock).toHaveBeenCalledWith({
            path: '/auctions/abc123',
        })
    })
})
