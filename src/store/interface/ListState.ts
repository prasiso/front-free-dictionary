export type Result<D> = {
    page: number
    limit: number
    data: D
    search: string
    entrie: string
}

export type ListState<D> = {
    result: Result<D>
    setResult: (params: Partial<Result<D>>) => void,
    reset: () => void
}

