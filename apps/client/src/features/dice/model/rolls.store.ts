import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type RollEntry } from './rolls-store.types'
import { type RollResult } from '@/features/dice'
import { diceApi, FetchRollsParams } from '../api/dice.api'

export const useRollsStore = defineStore('rolls', () => {
    // State
    const rolls = ref<RollEntry[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const pagination = ref<{
        page: number
        pageSize: number
        pageCount: number
        total: number
    } | null>(null)

    // Getters
    const totalRolls = computed(() => rolls.value.length)
    const recentRolls = computed(() =>
        [...rolls.value]
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 10)
    )
    const unsavedRolls = computed(() =>
        rolls.value.filter(roll => !roll.saved)
    )

    // Actions
    function addRoll(rollResult: RollResult): string {
        const id = `roll_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
        const newRoll: RollEntry = {
            id,
            rollResult,
            timestamp: Date.now(),
            saved: false,
        }

        rolls.value.unshift(newRoll)
        return id
    }

    async function saveRoll(rollId: string): Promise<void> {
        const roll = rolls.value.find(r => r.id === rollId)
        if (!roll) {
            throw new Error('Бросок не найден')
        }

        if (roll.saved) {
            return // Уже сохранен
        }

        try {
            isLoading.value = true
            error.value = null

            await diceApi.saveRollResult(roll.rollResult)
            roll.saved = true
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Ошибка сохранения броска'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function saveAllUnsavedRolls(): Promise<void> {
        const unsaved = unsavedRolls.value
        if (unsaved.length === 0) return

        try {
            isLoading.value = true
            error.value = null

            for (const roll of unsaved) {
                await diceApi.saveRollResult(roll.rollResult)
                roll.saved = true
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Ошибка сохранения бросков'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    function removeRoll(rollId: string): void {
        const index = rolls.value.findIndex(r => r.id === rollId)
        if (index !== -1) {
            rolls.value.splice(index, 1)
        }
    }

    function clearRolls(): void {
        rolls.value = []
        error.value = null
    }

    function clearError(): void {
        error.value = null
    }

    async function loadRolls(params: FetchRollsParams = {}): Promise<void> {
        try {
            isLoading.value = true
            error.value = null

            const result = await diceApi.fetchRolls(params)
            rolls.value = result.rolls
            pagination.value = result.pagination
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Ошибка загрузки бросков'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function loadMoreRolls(): Promise<void> {
        if (!pagination.value) return

        const nextPage = pagination.value.page + 1
        if (nextPage > pagination.value.pageCount) return

        try {
            isLoading.value = true
            error.value = null

            const result = await diceApi.fetchRolls({
                page: nextPage,
                pageSize: pagination.value.pageSize,
                sort: 'date:desc',
            })

            // Добавляем новые броски к существующим
            rolls.value = [...rolls.value, ...result.rolls]
            pagination.value = result.pagination
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Ошибка загрузки дополнительных бросков'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return {
        // State
        rolls,
        isLoading,
        error,
        pagination,

        // Getters
        totalRolls,
        recentRolls,
        unsavedRolls,

        // Actions
        addRoll,
        saveRoll,
        saveAllUnsavedRolls,
        removeRoll,
        clearRolls,
        clearError,
        loadRolls,
        loadMoreRolls,
    }
})
