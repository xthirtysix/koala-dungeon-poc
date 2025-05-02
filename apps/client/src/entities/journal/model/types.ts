export interface JournalEntry {
    time: string
    description: string
    cell: number
    type:
        | 'game'
        | 'dice'
        | 'gift'
        | 'wheel'
        | 'boss'
        | 'shop'
        | 'level'
        | 'system'
    hero: string
    marathon_day: number
    game_result: number
}

export interface Journal {
    days: JournalDay[]
    title?: string
    author?: string
    currentCell?: number
    isCompleted?: boolean
}

export interface JournalDay {
    date: string
    entries: JournalEntry[]
}
