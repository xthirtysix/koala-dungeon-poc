import { defineStore } from 'pinia'
import { ref } from 'vue'
import { marathonApi, type Marathon } from '@/entities/marathon'

export const useMarathonStore = defineStore('marathon', () => {
    const marathon = ref<Marathon | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const fetchMarathon = async () => {
        try {
            isLoading.value = true
            error.value = null
            const result = await marathonApi.fetchMarathon()
            marathon.value = result
        } catch (e) {
            error.value =
                e instanceof Error ? e.message : 'Ошибка загрузки марафона'
        } finally {
            isLoading.value = false
        }
    }

    const clearMarathon = () => {
        marathon.value = null
        error.value = null
    }

    return {
        marathon,
        isLoading,
        error,
        fetchMarathon,
        clearMarathon,
    }
})
