import { apiClient } from "@/lib"

const router = 'user/me/'
export const GetUserHistory = async (query: { page: number, limit: number, search?: string })=> {
 const queryString = Object.entries(query).map(([key, value]) => {
        return `${key}=${value}`
    }).join('&')
    const { data } = await apiClient.get(`${router}history?${queryString}`,)
    return data
}