import { ObstacleType } from '@/entities/obstacle'
import {
    ObstacleBackground,
    ObstacleBorder,
    ObstacleText,
} from '../model/obstacle-color.types'

export const BG_BY_TYPE = new Map<ObstacleType, ObstacleBackground>([
    ['одноразовая', 'bg-gray-300/90 dark:bg-gray-600/80'],
    ['многоразовая', 'bg-green-300/90 dark:bg-green-600/80'],
    ['один раз за стрим', 'bg-red-300/90 dark:bg-red-600/80'],
    ['событие', 'bg-blue-300/90 dark:bg-blue-600/80'],
])

export const BORDER_BY_TYPE = new Map<ObstacleType, ObstacleBorder>([
    ['одноразовая', 'border-gray-300 dark:border-gray-600/80'],
    ['многоразовая', 'border-green-300 dark:border-green-600/80'],
    ['один раз за стрим', 'border-red-300 dark:border-red-600/80'],
    ['событие', 'border-blue-300 dark:border-blue-600/80'],
])

export const TEXT_BY_TYPE = new Map<ObstacleType, ObstacleText>([
    ['одноразовая', 'text-gray-200'],
    ['многоразовая', 'text-green-200'],
    ['один раз за стрим', 'text-red-200'],
    ['событие', 'text-blue-200'],
])
