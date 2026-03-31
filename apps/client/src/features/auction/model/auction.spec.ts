import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuction } from './auction.composable'
import { type Ref } from 'vue'
import { AUCTION_QUERY_KEY } from '@/entities/auction'

const {
    routerPushMock,
    mutateMock,
    createAuctionMock,
    invalidateQueriesMock,
    onSettledCallback,
    mockData,
    mockAsyncStatus,
    AUCTION_MOCK_ID,
} = vi.hoisted(() => ({
    routerPushMock: vi.fn(),
    mutateMock: vi.fn(),
    createAuctionMock: vi.fn(),
    invalidateQueriesMock: vi.fn().mockResolvedValue(undefined),
    AUCTION_MOCK_ID: 'abc123',
    onSettledCallback: {
        value: undefined as (() => Promise<void>) | undefined,
    },
    mockData: { value: { documentId: 'abc123' } } as Ref<
        { documentId?: string } | undefined
    >,
    mockAsyncStatus: { value: 'idle' } as Ref<'idle' | 'loading'>,
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
    }) => {
        onSettledCallback.value = options.onSettled

        return {
            mutateAsync: mutateMock.mockImplementation(async () => {
                mockAsyncStatus.value = 'loading'
                await options.mutation?.()
                await options.onSettled?.()
                mockAsyncStatus.value = 'idle'
            }),
            data: mockData,
            asyncStatus: mockAsyncStatus,
        }
    },
    useQueryCache: () => ({
        invalidateQueries: invalidateQueriesMock,
    }),
}))

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: routerPushMock,
    }),
}))

describe('useAuction', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockData.value = { documentId: AUCTION_MOCK_ID }
        mockAsyncStatus.value = 'idle'
    })

    it('returns create function and status', () => {
        const { create, createStatus } = useAuction()

        expect(create).toBeDefined()
        expect(createStatus.value).toBe('idle')
    })

    it('calls auctionApi.createAuction on create', async () => {
        const { create } = useAuction()
        await create()

        expect(createAuctionMock).toHaveBeenCalledOnce()
    })

    it('invalidates auction queries after creation', async () => {
        const { create } = useAuction()
        await create()

        expect(invalidateQueriesMock).toHaveBeenCalledWith({
            key: [AUCTION_QUERY_KEY],
            exact: true,
        })
    })

    it('redirects to auction page after successful creation', async () => {
        const { create } = useAuction()
        await create()

        expect(routerPushMock).toHaveBeenCalledWith({
            path: `/auctions/${AUCTION_MOCK_ID}`,
        })
    })

    it('does not redirect if documentId is missing', async () => {
        mockData.value = undefined
        const { create } = useAuction()
        await create()

        expect(routerPushMock).not.toHaveBeenCalled()
    })

    it('does not call mutation when already loading', async () => {
        mockAsyncStatus.value = 'loading'
        const { create } = useAuction()
        await create()

        expect(mutateMock).not.toHaveBeenCalled()
    })
})
