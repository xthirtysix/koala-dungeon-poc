import { ref } from 'vue'
import { Dice } from '@/shared/tools/dice'
import { RollConfirm } from '@/widgets/roll-confirm'
import { OpenRollConfirmOptions } from './dice-modal.types'

export function useDiceModal() {
    const isOpen = ref(false)
    const isDrawerOpen = ref(false)

    const overlay = useOverlay()
    const rollConfirmModal = overlay.create(RollConfirm)

    function toggle() {
        isOpen.value = !isOpen.value
    }

    function close() {
        isOpen.value = false
    }

    function openDrawer() {
        isOpen.value = false
        isDrawerOpen.value = true
    }

    function closeDrawer() {
        isDrawerOpen.value = false
    }

    async function openRollConfirm(
        dice: Dice,
        options?: OpenRollConfirmOptions,
    ) {
        const instance = rollConfirmModal.open({
            dice,
            statCheck: options?.statCheck,
            title: 'Бросить кости',
            description: 'Выберите кость для броска',
        })

        const result = await instance.result

        return result
    }

    return {
        isOpen,
        isDrawerOpen,
        toggle,
        close,
        openDrawer,
        closeDrawer,
        openRollConfirm,
    }
}
