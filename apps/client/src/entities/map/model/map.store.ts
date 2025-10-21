import { ref, computed, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { pathMock } from '@/widgets/path'
import { Cell, CellEvent } from '@/entities/cell'
import type { MoveLogEntry } from '@/entities/map'
import { updateCustomMarks, getCustomMarks } from '../api/map.api'
import { CURRENT_MARATHON_UID } from '@/shared/config'

export const useMapStore = defineStore('map', () => {
    const cells = shallowRef<Cell[]>(pathMock)
    const moveLog = shallowRef<MoveLogEntry[]>([])
    const currentCell = ref<number>(-1)
    const figureRef = ref<HTMLElement | null>(null)
    const markedCells = ref<Map<number, string>>(new Map())
    const tokenCell = ref<number>(-1)
    const moveInterval = ref<ReturnType<typeof setInterval> | null>(null)

    const lastCell = computed<number>(() => {
        return cells.value.length - 1 < 0 ? 0 : cells.value.length - 1
    })

    function addToPath(cell: Cell) {
        cells.value.push(cell)
    }

    async function loadCustomMarksFromServer() {
        try {
            const response = await getCustomMarks(CURRENT_MARATHON_UID)
            // Преобразуем объект в Map
            const newMarkedCells = new Map<number, string>()

            // Проверяем, есть ли данные и custom_marks не null
            if (response.data && response.data.length > 0) {
                const mapData = response.data[0]
                if (mapData.custom_marks) {
                    Object.entries(mapData.custom_marks).forEach(([cellNumber, emoji]) => {
                        newMarkedCells.set(Number(cellNumber), emoji)
                    })
                }
            }

            markedCells.value = newMarkedCells
            console.log('Метки успешно загружены с сервера (публичный эндпоинт)')
        } catch (error) {
            console.error('Ошибка загрузки меток с сервера:', error)
            // Можно добавить уведомление пользователю об ошибке
        }
    }

    async function sendCustomMarksToServer() {
        const jwt = localStorage.getItem('jwt')
        if (!jwt) {
            console.warn('Пользователь не авторизован, метки не отправлены на сервер')
            return
        }

        try {
            await updateCustomMarks(markedCells.value, jwt)
            console.log('Метки успешно обновлены на сервере (PUT запрос)')
        } catch (error) {
            console.error('Ошибка обновления меток на сервере:', error)
            // Можно добавить уведомление пользователю об ошибке
        }
    }

    async function markCell(cell: number, emoji: string) {
        markedCells.value.set(cell, emoji)
        await sendCustomMarksToServer()
    }

    async function unmarkCell(cell: number) {
        markedCells.value.delete(cell)
        await sendCustomMarksToServer()
    }

    function moveTo(cell: number) {
        currentCell.value = cell
    }

    function setMoveInterval(interval: ReturnType<typeof setInterval> | null) {
        moveInterval.value = interval
    }

    function clearMoveInterval() {
        if (moveInterval.value) {
            clearInterval(moveInterval.value)
            moveInterval.value = null
        }
    }

    const enrichedCells = computed<Cell[]>(() => {
        let zoneEvent: CellEvent | undefined

        return cells.value.map((c, index) => {
            if (!zoneEvent) {
                zoneEvent = c.events?.find((e) => e.type === 'zone')
            }
            if (
                zoneEvent &&
                'endCell' in zoneEvent &&
                index + 1 > zoneEvent.endCell
            ) {
                zoneEvent = undefined
            }

            return {
                ...c,
                events: [
                    ...(c.events?.filter((e) => e.type !== 'zone') || []),
                    ...(zoneEvent ? [zoneEvent] : []),
                ],
            }
        })
    })

    return {
        currentCell,
        lastCell,
        moveLog,
        moveTo,
        addToPath,
        figureRef,
        cells,
        enrichedCells,
        markedCells,
        markCell,
        unmarkCell,
        loadCustomMarksFromServer,
        tokenCell,
        moveInterval,
        setMoveInterval,
        clearMoveInterval,
    }
})
