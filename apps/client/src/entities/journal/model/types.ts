type JournalEntryBase = {
    time: string
    marathon_day: number
    description: string
    cell: number
}

export type JournalEntryOrdinary = JournalEntryBase & {
    type:
        | 'dice'
        | 'gift'
        | 'wheel'
        | 'boss'
        | 'shop'
        | 'level'
        | 'system'
}

export type JournalEntryGame = JournalEntryBase & {
    type: 'game'
    hero: string
    game_result: number
}

export type JournalEntry = JournalEntryOrdinary | JournalEntryGame

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
