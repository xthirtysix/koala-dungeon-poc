import type { TailwindColor } from '@/shared/model/colors.types'

export type ObstacleColor = Extract<
    TailwindColor,
    'gray' | 'green' | 'blue' | 'red'
>
export type ObstacleBackground =
    `bg-${ObstacleColor}-300/90 dark:bg-${ObstacleColor}-600/80`
export type ObstacleBorder = `border-${ObstacleColor}-300 dark:border-${ObstacleColor}-600/80`
export type ObstacleText = `text-${ObstacleColor}-200`
