"use client"
import { useUI } from '@/context/UIContext';
import { getUser, removeUser, setUser } from '@/helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})
apiClient.interceptors.request.use((config) => {
    const user = getUser()
    config.headers.Authorization = `Bearer ${user?.token || ''}`
    return config
})


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const router = useRouter()
        const { showAlert } = useUI()
        if (error.status === 401) {
            removeUser()
            showAlert({
                type: "error",
                message: "Logue-se novamente"
            })
            router.push('/login')
        }
        console.error('AXIOS ERROR:', error)
        return Promise.reject(error)
    }
)
export { apiClient }