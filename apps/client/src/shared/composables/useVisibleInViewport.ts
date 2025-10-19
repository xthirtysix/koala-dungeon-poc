import { ref, onMounted, onUnmounted } from 'vue'

export function useVisibleInViewport<T extends Element = Element>() {
    const el = ref<T | null>(null)
    const isVisible = ref(false)
    let observer: IntersectionObserver | null = null

    onMounted(() => {
        if (el.value) {
            observer = new window.IntersectionObserver(
                ([entry]) => {
                    isVisible.value = entry.isIntersecting
                },
                { threshold: 0.1 }
            )
            observer.observe(el.value)
        }
    })

    onUnmounted(() => {
        if (observer && el.value) observer.unobserve(el.value)
    })

    return { el, isVisible }
}
