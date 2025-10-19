import { onMounted } from 'vue'
import { useMapStore } from '../model/map.store'

export function useMapMarks() {
    const mapStore = useMapStore()

    onMounted(async () => {
        await mapStore.loadCustomMarksFromServer()
    })

    return {
        markedCells: mapStore.markedCells,
        markCell: mapStore.markCell,
        unmarkCell: mapStore.unmarkCell,
        loadCustomMarksFromServer: mapStore.loadCustomMarksFromServer,
    }
}
