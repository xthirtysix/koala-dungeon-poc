export interface Catcher {
  id: number
  nickname: string
  battle_tag: string
  score: number
}

export interface FetchCatchersResult {
  catchers: Catcher[]
  pagination: {
    page: number
    pageCount: number
    pageSize: number
    total: number
  }
}

export interface FetchCatchersParams {
  page?: number
  pageSize?: number
}
