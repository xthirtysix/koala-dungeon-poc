import { Ref, ref } from 'vue'

export function useToken({ token }: { token: Ref<HTMLElement | null> }) {
    const tokenPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 })

    function updateTokenPosition(x: number, y: number) {
        if (!token.value) return

        token.value.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    return {
        tokenPosition,
        updateTokenPosition,
    }
}
