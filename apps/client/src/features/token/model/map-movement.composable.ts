import { nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useMutation, useQueryCache } from '@pinia/colada'
import { useMapStore } from '@/entities/map'
import {
    characterApi,
    type UpdateMapPlacementParams,
} from '@/entities/character'
import type {
    UseMapMovementParams,
    MoveTokenOptions,
} from './map-movement.types'

export function useMapMovement({ path }: UseMapMovementParams) {
    const { clearMoveInterval, setMoveInterval } = useMapStore()
    const { enrichedCells, tokenCell: currentCellIndex } =
        storeToRefs(useMapStore())

    const queryCache = useQueryCache()

    const { mutate: updateMapPlacement, mutateAsync: updateMapPlacementAsync } =
        useMutation({
            mutation: (params: UpdateMapPlacementParams) =>
                characterApi.updateMapPlacement(params),
            onError: (error) => {
                console.error('Ошибка при обновлении позиции персонажа:', error)
            },
        })

    async function moveTokenTo(index: number, { teleport }: MoveTokenOptions): Promise<void> {
        const clampedIndex = Math.max(0, Math.min(index, path.length - 1))

        if (clampedIndex === currentCellIndex.value) {
            return
        }

        clearMoveInterval()
        const step = clampedIndex > currentCellIndex.value ? 1 : -1

        const shallLockMovement = enrichedCells.value[
            clampedIndex
        ].events?.some(
            (event) => event.type === 'ascend' || event.type === 'descend',
        )

        // Если разница между targetIndex и currentCellIndex > 20, просто обновляем currentCellIndex и выходим
        if (
            teleport ||
            Math.abs(clampedIndex - currentCellIndex.value) >= 20
        ) {
            currentCellIndex.value = clampedIndex
            await updateMapPlacementAsync({
                mapPlacement: clampedIndex + 1,
                isMovementLocked: shallLockMovement,
            })
            await queryCache.invalidateQueries({
                key: ['main-character'],
            })
            return
        }

        updateMapPlacement({
            mapPlacement: clampedIndex + 1,
            isMovementLocked: shallLockMovement,
        })

        setMoveInterval(
            setInterval(async () => {
                currentCellIndex.value += step
                if (currentCellIndex.value === clampedIndex) {
                    clearMoveInterval()
                    await nextTick()
                    await queryCache.invalidateQueries({
                        key: ['main-character'],
                    })
                }
            }, 250),
        )
    }

    async function walk(index: number) {
        return moveTokenTo(index, { teleport: false })
    }

    async function teleport(index: number) {
        return moveTokenTo(index, { teleport: true })
    }

    const movementStrategy = new Map([
        [true, teleport],
        [false, walk],
    ])

    return {
        walk,
        teleport,
        movementStrategy,
    }
}
