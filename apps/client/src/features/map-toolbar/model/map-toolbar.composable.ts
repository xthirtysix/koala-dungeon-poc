import { computed, StyleValue, watch } from 'vue'
import {
    getCellEmojiByEvent,
    getCellTailwindColorByEvent,
    getCellThrowByEvent,
    getEventLabelByEvent,
    useMapStore
} from '@/entities/map'
import type { ToolbarCell } from './toolbar-cell.type'
import { useCharacter } from '@/entities/character'

export function useMapToolbar() {
    const mapStore = useMapStore()
    const { data: character } = useCharacter()

    const tokenCellData = computed<ToolbarCell>(() => {
        const events =
            mapStore.enrichedCells[
                character?.value?.map_placement
                    ? character.value.map_placement - 1
                    : -1
            ]?.events || []
        const css = getCellTailwindColorByEvent(events)
        const icon = getCellEmojiByEvent(events)
        const throwData = getCellThrowByEvent(events)
        const title = getEventLabelByEvent(events) || 'Нет событий'

        return {
            number: character?.value?.map_placement || 0,
            title: throwData ? `${title} на ${throwData.destination}` : title,
            css,
            icon,
            throw: throwData,
            ...(mapStore.enrichedCells[mapStore.tokenCell] || ''),
        }
    })

    const selectedCellData = computed<ToolbarCell>(() => {
        const events =
            mapStore.enrichedCells[mapStore.currentCell]?.events || []
        const css = getCellTailwindColorByEvent(events)
        const icon = getCellEmojiByEvent(events)
        const throwData = getCellThrowByEvent(events)
        const title = getEventLabelByEvent(events) || 'Нет событий'

        return {
            number: mapStore.currentCell + 1,
            title: throwData ? `${title} на ${throwData.destination}` : title,
            css,
            icon,
            throw: throwData,
            ...mapStore.enrichedCells[mapStore.currentCell],
        }
    })

    const toolbarStyle = computed<StyleValue>(() => {
        if (
            !tokenCellData.value.events?.some((event) => event.type === 'zone')
        ) {
            return
        }

        const zoneType = tokenCellData.value.events?.find(
            (event) => event.type === 'zone',
        )?.zoneType

        switch (zoneType) {
            case 'boss':
                return 'ring-1 ring-red-500/20 bg-red-900/10 shadow-md shadow-red-500/20'
            case 'companion':
                return 'ring-1 ring-yellow-500/20 bg-yellow-900/10 shadow-md shadow-yellow-500/20'
            default:
                return ''
        }
    })

    watch(tokenCellData, (newVal) => {
        if (newVal.number === selectedCellData.value.number) {
            mapStore.currentCell = -1
        }
    })

    return {
        tokenCell: tokenCellData,
        selectedCell: selectedCellData,
        toolbarStyle,
    }
}
