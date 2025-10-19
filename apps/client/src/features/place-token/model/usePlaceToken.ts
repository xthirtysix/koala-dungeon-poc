import { computed } from 'vue'
import { useMapStore } from '@/entities/map'

export function usePlaceToken() {
    const tokenStore = useTokenStore()
    const mapStore = useMapStore()

    const placeToken = (cellNumber: number) => {
        if (!tokenStore.token) return

        const cell = mapStore.enrichedCells[cellNumber]
        if (!cell) return

        // Конвертируем относительные координаты в пиксели
        // Предполагаем, что карта имеет размеры контейнера
        const mapContainer = document.querySelector('.map-container')
        if (!mapContainer) return

        const rect = mapContainer.getBoundingClientRect()
        const x = cell.x * rect.width
        const y = cell.y * rect.height

        // Обновляем позицию токена (центрируем относительно размера токена)
        tokenStore.token.style.transform = `translate3d(${x - 50}px, ${y - 50}px, 0)`
    }

    const canPlaceToken = computed(() => !!tokenStore.token)

    return {
        placeToken,
        canPlaceToken,
    }
}
