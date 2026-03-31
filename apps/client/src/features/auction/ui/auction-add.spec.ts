import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest'
import { mount, VueWrapper, DOMWrapper } from '@vue/test-utils'
import { ref, computed } from 'vue'
import AuctionAdd from './auction-add.vue'

const { routerPushMock, createAuctionMock, mockData, mockAsyncStatus } =
    vi.hoisted(() => ({
        routerPushMock: vi.fn(),
        createAuctionMock: vi.fn(),
        mockData: {
            value: { documentId: 'abc123' } as
                | { documentId?: string }
                | undefined,
        },
        mockAsyncStatus: {
            value: 'idle' as 'idle' | 'loading',
        },
    }))

vi.mock('@/entities/auction', () => ({
    auctionApi: {
        createAuction: createAuctionMock,
    },
    AUCTION_QUERY_KEY: 'auctions',
}))

vi.mock('@pinia/colada', () => ({
    useMutation: (options: {
        onSettled?: () => Promise<void>
        mutation?: () => Promise<void>
    }) => ({
        mutate: async () => {
            await options.mutation?.()
            await options.onSettled?.()
        },
        data: ref(mockData.value),
        asyncStatus: computed(() => mockAsyncStatus.value),
    }),
    useQueryCache: () => ({
        invalidateQueries: vi.fn().mockResolvedValue(undefined),
    }),
}))

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: routerPushMock,
    }),
}))

const globalStubs = {
    stubs: {
        'u-icon': true,
        UIcon: true,
    },
}

describe('auction add', () => {
    let wrapper: VueWrapper<InstanceType<typeof AuctionAdd>>
    let wrapperButton: DOMWrapper<Element>

    afterEach(() => {
        vi.clearAllMocks()
    })

    describe('valid response', () => {
        beforeEach(() => {
            mockAsyncStatus.value = 'idle'
            wrapper = mount(AuctionAdd, { global: globalStubs })
            wrapperButton = wrapper.find('.auction-add')
        })

        it('calls auctionApi.createAuction on button click', async () => {
            await wrapperButton.trigger('click')

            expect(createAuctionMock).toHaveBeenCalledOnce()
        })

        it('has cursor-pointer class when idle', () => {
            expect(wrapperButton.classes()).toContain('cursor-pointer')
            expect(wrapperButton.classes()).not.toContain('cursor-progress')
        })
    })

    describe('invalid response', () => {
        beforeEach(() => {
            mockData.value = undefined
            wrapper = mount(AuctionAdd, { global: globalStubs })
            wrapperButton = wrapper.find('.auction-add')
        })

        it('does not redirect if no id returned', async () => {
            await wrapperButton.trigger('click')

            expect(routerPushMock).not.toHaveBeenCalled()
        })
    })

    describe('loading state', () => {
        beforeEach(() => {
            mockAsyncStatus.value = 'loading'
            wrapper = mount(AuctionAdd, { global: globalStubs })
            wrapperButton = wrapper.find('.auction-add')
        })

        afterEach(() => {
            mockAsyncStatus.value = 'idle'
        })

        it('does not call createAuction when already loading', async () => {
            await wrapperButton.trigger('click')

            expect(createAuctionMock).not.toHaveBeenCalled()
        })

        it('has cursor-progress class when loading', () => {
            expect(wrapperButton.classes()).toContain('cursor-progress')
            expect(wrapperButton.classes()).not.toContain('cursor-pointer')
        })
    })
})
