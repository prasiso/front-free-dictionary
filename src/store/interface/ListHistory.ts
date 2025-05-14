
export type ListHistory<D> = {
    page: number
    limit: number
    hasNext: boolean
    hasPrev: boolean
    data: D
    search?: string
    entrie: string
    setResult: (params: Partial<Result<D>>) => void,
    reset: () => void
    resetSearch: () => void
}

