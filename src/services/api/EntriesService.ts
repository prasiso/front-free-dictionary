import { apiClient } from "@/lib"
import { entriesFindAllResp, WordEntry } from "."

const router = 'entries/end/'
export const EntriesGetEntries = async (query: { page: number, limit: number, search?: string }): Promise<entriesFindAllResp> => {
    const queryString = Object.entries(query).map(([key, value]) => {
        return `${key}=${value}`
    }).join('&')
    const { data } = await apiClient.get(`${router}?${queryString}`,)
    return data
}

export const EntriesGetEntrie = async (word: string): Promise<WordEntry> => {
    const { data } = await apiClient.get(`${router}${word}`,)
    return data
}