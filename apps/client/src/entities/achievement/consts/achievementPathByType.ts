import Achievement from '../model/achievement-model'

const ASSET_PATH_PREFIX = '/achievements/'

export const achievementPathByType = new Map<Achievement, string>([
    [Achievement?.SPIRIT_FIRST, ASSET_PATH_PREFIX + 'spirit_1.png'],
    [Achievement?.SPIRIT_SECOND, ASSET_PATH_PREFIX + 'spirit_2.png'],
    [Achievement?.SPIRIT_THIRD, ASSET_PATH_PREFIX + 'spirit_3.png'],
    [Achievement?.SPIRIT_FOURTH, ASSET_PATH_PREFIX + 'spirit_4.png'],
    [Achievement?.TRUE_EVIL, ASSET_PATH_PREFIX + 'true_evil.png'],
    [Achievement?.HELPING_HAND, ASSET_PATH_PREFIX + 'helping_hand.png'],
    [Achievement?.BACK_AND_FORTH, ASSET_PATH_PREFIX + 'balance.png'],
    [Achievement?.SAINT, ASSET_PATH_PREFIX + 'saint.png'],
    [Achievement?.TOP_AUTUMN, ASSET_PATH_PREFIX + 'top_autumn.png'],
    [Achievement?.TOP_WINTER, ASSET_PATH_PREFIX + 'top_winter.png'],
])
