import { apiClient } from "@/lib"
import { entriesFindAllResp, entriesGetFindOneResp } from "."

const router = 'entries/end/'
export const EntriesGetEntries = async (): Promise<entriesFindAllResp> => {
    const { data } = await apiClient.get(`${router}?page=1&limit=10`,)
    return data
}

export const EntriesGetEntrie = async (word: string): Promise<entriesGetFindOneResp> => {
    const { data } = await apiClient.get(`${router}/${word}`,)
    return data
}