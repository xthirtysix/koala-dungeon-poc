export const MARKS = ['💣', '🎁', '👻', '💩', '💰'] as const

export type MarkType = typeof MARKS[number]
