import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SlotDrum } from '@/widgets/slot-drum'
import { ITEMS } from '../config/slot-drum-test.mocks'
import type { SlotDrumWrapper } from '../model/slot-drum-test.types'

const fillStyleHistory: string[] = []

const UButtonStub = {
    template: '<button class="drum__button"><slot /></button>',
}

const globalStubs = {
    stubs: {
        'u-button': UButtonStub,
        UButton: UButtonStub,
    },
}

const mockContext = {
    rect: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    scale: vi.fn(),
    clearRect: vi.fn(),
    save: vi.fn(),
    translate: vi.fn(),
    beginPath: vi.fn(),
    roundRect: vi.fn(),
    fill: vi.fn(),
    restore: vi.fn(),
    set fillStyle(value: string) {
        fillStyleHistory.push(value)
    },
}

describe('slot drum', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        fillStyleHistory.length = 0
    })

    describe('with valid context', () => {
        let wrapper: SlotDrumWrapper

        beforeEach(() => {
            HTMLCanvasElement.prototype.getContext = vi.fn(
                () => mockContext,
            ) as unknown as typeof HTMLCanvasElement.prototype.getContext
            wrapper = mount(SlotDrum, {
                props: { items: ITEMS },
                global: globalStubs,
            })
            vi.unstubAllGlobals()
        })

        it('has canvas context', () => {
            const canvas = wrapper.find('canvas').element

            expect(canvas.getContext('2d')).not.toBeNull()
        })

        it('draws items on canvas', () => {
            expect(
                mockContext.fillText.mock.calls.length,
            ).toBeGreaterThanOrEqual(ITEMS.length)
            expect(fillStyleHistory).toContain(ITEMS[0].color)
        })

        it('exposes spin method', () => {
            expect(wrapper.vm.spin).toBeDefined()
            expect(typeof wrapper.vm.spin).toBe('function')
        })

        it('starts animation on spin called', () => {
            let rafCallback: FrameRequestCallback | undefined = undefined

            vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
                (cb) => {
                    rafCallback = cb
                    return 1
                },
            )

            wrapper.vm.spin()

            expect(window.requestAnimationFrame).toHaveBeenCalled()
        })

        it('emits result event on drum stopped', async () => {
            let rafCallback: FrameRequestCallback | undefined

            vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
                (cb) => {
                    rafCallback = cb
                    return 1
                },
            )

            vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {
                rafCallback = undefined
            })

            wrapper.vm.spin()
            wrapper.vm.stop()

            let maxIterations = 1000

            while (rafCallback && maxIterations) {
                if (rafCallback) rafCallback(performance.now())
                maxIterations--
            }

            const resultEmit = wrapper.emitted('result')

            expect(rafCallback).toBeUndefined()
            expect(resultEmit).toBeDefined()
            expect(resultEmit).toHaveLength(1)
            expect(typeof resultEmit![0][0]).toBe('number')
        })
    })

    describe('with various dpr', () => {
        it('sets up canvas dimensions and scales for device pixel ratio', () => {
            const mockDpr = 2
            vi.stubGlobal('devicePixelRatio', mockDpr)

            const wrapper = mount(SlotDrum, {
                props: { items: ITEMS },
                global: globalStubs,
            })
            const canvas = wrapper.find('canvas').element

            expect(canvas.width).toBeGreaterThan(0)
            expect(canvas.height).toBeGreaterThan(0)
            expect(mockContext.scale).toHaveBeenCalledWith(mockDpr, mockDpr)

            vi.unstubAllGlobals()
        })

        it('uses fallback dpr of 1 when devicePixelRatio is not available', () => {
            vi.stubGlobal('devicePixelRatio', undefined)

            mount(SlotDrum, { props: { items: ITEMS }, global: globalStubs })
            expect(mockContext.scale).toHaveBeenCalledWith(1, 1)

            vi.unstubAllGlobals()
        })
    })

    describe('with context lost', () => {
        beforeEach(() => {
            HTMLCanvasElement.prototype.getContext = vi.fn(
                () => undefined,
            ) as unknown as typeof HTMLCanvasElement.prototype.getContext
        })

        it('does not draw if context is lost', () => {
            const wrapper = mount(SlotDrum, {
                props: { items: ITEMS },
                global: globalStubs,
            })
            const canvas = wrapper.find('canvas').element

            expect(canvas.getContext('2d')).toBeFalsy()
        })
    })

    describe('without items', () => {
        it('draws nothing, if there is no items', () => {
            expect(mockContext.fillText.mock.calls.length).toBe(0)
        })
    })
})
