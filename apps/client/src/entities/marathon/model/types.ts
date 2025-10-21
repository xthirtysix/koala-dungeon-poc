export interface Marathon {
    id: number
    startTime: string
    totalTime: number
    passedTime: number
    isPaused: boolean
    isActive: boolean
    banner?: {
        url: string
    }
    bannerLink?: string
}
