export const transformQueryInString = (query: { page: number, limit: number, search?: string }) => {
    const queryString = Object.entries(query).map(([key, value]) => {
        return `${key}=${value}`
    }).join('&')
    return queryString
}