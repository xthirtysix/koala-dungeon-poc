import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const useDiceButtonFeatureFlag = () => {
    const route = useRoute()

    const IS_DICE_BUTTON_VISIBLE = computed<boolean>(() => {
        return !!route?.query.dice
    })

    return { IS_DICE_BUTTON_VISIBLE }
}
