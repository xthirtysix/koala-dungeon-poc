import { computed } from 'vue'
import { useRollsStore } from './rolls.store'
import { type RollResult } from '@/features/dice'

export function useRolls() {
    const store = useRollsStore()

    const addRollAndSave = async (rollResult: RollResult): Promise<string> => {
        const rollId = store.addRoll(rollResult)
        try {
            await store.saveRoll(rollId)
        } catch (error) {
            console.error('Ошибка при сохранении броска:', error)
            // Бросок остается в store как несохраненный
        }
        return rollId
    }

    const addRollOnly = (rollResult: RollResult): string => {
        return store.addRoll(rollResult)
    }

    return {
        // State - используем computed для реактивности
        rolls: computed(() => store.rolls),
        isLoading: computed(() => store.isLoading),
        error: computed(() => store.error),
        pagination: computed(() => store.pagination),

        // Getters
        totalRolls: store.totalRolls,
        recentRolls: store.recentRolls,
        unsavedRolls: store.unsavedRolls,

        // Actions
        addRoll: addRollOnly,
        addRollAndSave,
        saveRoll: store.saveRoll,
        saveAllUnsavedRolls: store.saveAllUnsavedRolls,
        removeRoll: store.removeRoll,
        clearRolls: store.clearRolls,
        clearError: store.clearError,
        loadRolls: store.loadRolls,
        loadMoreRolls: store.loadMoreRolls,
    }
}
