import { describe, vi, it, beforeEach, expect } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import AuctionPage from './auction-page.vue'
import { U_BUTTON_STUB } from '@/shared/tests'
import { ref } from 'vue'
import { AUCTION_QUERY_KEY } from '@/entities/auction'

const queryCallback: { value: (() => Promise<void>) | undefined } = {
    value: undefined,
}

const AUCTION_MOCK_TITLE = 'Аукцион 05.01.2026'
const queryData = ref({ id: 1, title: AUCTION_MOCK_TITLE, is_closed: false })

const mockGetQueryData = vi.fn()
const mockSetQueryData = vi.fn()
const mockCancelQueries = vi.fn()

let capturedOnMutate: ((data: any) => any) | undefined

vi.mock('vue-router', () => ({
    useRoute: () => ({
        params: {
            id: '1',
        },
    }),
}))

const globalStubs = {
    stubs: {
        UButton: {
            template: U_BUTTON_STUB,
        },
    },
}

vi.mock('@tanstack/vue-query', () => ({
    useQuery: (options: { queryFn: () => Promise<void> }) => {
        queryCallback.value = options.query

        return {
            data: queryData,
            status: ref('success'),
        }
    },
    useQueryClient: () => ({
        getQueryData: mockGetQueryData,
        setQueryData: mockSetQueryData,
        cancelQueries: mockCancelQueries,
    }),
    useMutation: (options: { onMutate?: (data: any) => any }) => {
        capturedOnMutate = options.onMutate
        return {
            mutate: vi.fn((params: { title: string }) => {
                // Вызываем onMutate как это делает реальный useMutation
                if (options.onMutate) {
                    options.onMutate(params)
                }
                queryData.value = { ...queryData.value, title: params.title }
            }),
        }
    },
}))

describe('Auction Page', () => {
    let wrapper: VueWrapper<InstanceType<typeof AuctionPage>>

    beforeEach(() => {
        wrapper = mount(AuctionPage, { global: globalStubs })
        vi.clearAllMocks()
    })

    it('gets id from query param', async () => {
        await flushPromises()
        const pageTitle = wrapper.find('h1').element.textContent

        expect(pageTitle).toBe(AUCTION_MOCK_TITLE)
    })

    it('allows to edit title', async () => {
        await wrapper.find('.auction__rename').trigger('click')
        await flushPromises()

        expect(wrapper.find('h1').exists()).toBe(false)
        expect(wrapper.find('input[name="title"]').exists()).toBe(true)
    })

    it('saves title on blur', async () => {
        const NEW_TITLE = 'New title'
        await wrapper.find('.auction__rename').trigger('click')
        await flushPromises()

        const input = wrapper.find('input[name="title"]')
        await input.setValue(NEW_TITLE)
        await input.trigger('blur')
        await flushPromises()

        const titleWrapper = wrapper.find('h1')

        expect(titleWrapper.exists()).toBe(true)
        expect(titleWrapper.element.textContent).toBe(NEW_TITLE)
        expect(wrapper.find('input[name="title"]').exists()).toBe(false)
    })

    it.todo('ends the auction', () => {
        const endButton = wrapper.find('auction__end')
        queryData.value = { ...queryData.value, is_closed: true }
        endButton.trigger('click')
        const endedBadge = wrapper.find('.u-badge')

        expect(endedBadge).toBeDefined()
    })

    describe('onMutate optimistic update', () => {
        beforeEach(() => {
            // Настраиваем что getQueryData вернёт текущие данные
            mockGetQueryData.mockReturnValue(queryData.value)
        })

        it('updates cache optimistically on title change', async () => {
            await wrapper.find('.auction__rename').trigger('click')
            await flushPromises()

            const input = wrapper.find('input[name="title"]')
            await input.setValue('Новый заголовок')
            await input.trigger('blur')
            await flushPromises()

            // Проверяем что setQueryData вызван с новым title
            expect(mockSetQueryData).toHaveBeenCalledWith(
                [AUCTION_QUERY_KEY, '1'],
                expect.objectContaining({ title: 'Новый заголовок' }),
            )

            // Проверяем что cancelQueries вызван
            expect(mockCancelQueries).toHaveBeenCalledWith({
                key: [AUCTION_QUERY_KEY, '1'],
            })
        })

        it('does nothing if no cached data exists', async () => {
            mockGetQueryData.mockReturnValue(undefined)

            await wrapper.find('.auction__rename').trigger('click')
            await flushPromises()

            const input = wrapper.find('input[name="title"]')
            await input.setValue('Новый заголовок')
            await input.trigger('blur')
            await flushPromises()

            expect(mockSetQueryData).not.toHaveBeenCalled()
        })
    })
})
