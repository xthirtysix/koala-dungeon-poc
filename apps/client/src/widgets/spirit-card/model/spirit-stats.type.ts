type SpiritStatsLabel =
    | 'помехи'
    | 'помощь'
    | 'отложено'
    | 'донаты'
    | 'реролы'
    | 'достижения'

export type SpiritStats = {
    label: SpiritStatsLabel
    value: number
}
