import Achievement from '../model/achievement-model'

export const achievementNameByType = new Map<string, string>([
    [Achievement.SPIRIT_FIRST, 'Маленький злой дух'],
    [Achievement.SPIRIT_SECOND, 'Средний злой дух'],
    [Achievement.SPIRIT_THIRD, 'Большой злой дух'],
    [Achievement.SPIRIT_FOURTH, 'Огромный злой дух'],
    [Achievement.TRUE_EVIL, 'Истинное зло'],
    [Achievement.HELPING_HAND, 'Ты не туда воюешь'],
    [Achievement.BACK_AND_FORTH, 'Тудан-Судан'],
    [Achievement.SAINT, 'Торжество добра'],
    [Achievement.TOP_AUTUMN, 'Осенний тупа топ'],
    [Achievement.TOP_WINTER, 'Зимний тупа топ'],
])
