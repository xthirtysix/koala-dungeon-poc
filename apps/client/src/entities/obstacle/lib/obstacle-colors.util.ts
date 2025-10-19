import { ObstacleType } from '@/entities/obstacle'
import { TailwindLiteralColor } from '@/shared/lib/color.utils'

export const obstacleColorByType = new Map<ObstacleType, TailwindLiteralColor>([
    ['одноразовая', 'red'],
    ['многоразовая', 'green'],
    ['один раз за стрим', 'purple'],
    ['событие', 'blue'],
])
