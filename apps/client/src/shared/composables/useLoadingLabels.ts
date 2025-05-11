import { ref, watch, type Ref } from 'vue'

export default function useLoadingLabels(
    messages: string[],
    loadingRef: Ref<boolean>,
) {
    const loadingLabel = ref(
        messages[Math.floor(Math.random() * messages.length)],
    )

    watch(
        loadingRef,
        (isLoading) => {
            if (isLoading) {
                const idx = Math.floor(Math.random() * messages.length)
                loadingLabel.value = messages[idx]
            }
        },
        { flush: 'pre' },
    )

    return {
        loadingLabel,
    }
}
