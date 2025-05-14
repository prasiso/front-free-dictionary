import { apiClient } from "@/lib"
import { WordEntry } from "."

const router = 'entries/end/'
export const EntriesGetEntries = async (query: { page: number, limit: number, search?: string }): Promise<any> => {
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

export const EntriesPostFav = async (word: string): Promise<void> => {
    await apiClient.post(`${router}${word}/favorite`)
}

export const EntriesPostUnFav = async (word: string): Promise<void> => {
    await apiClient.delete(`${router}${word}/unfavorite`)
}