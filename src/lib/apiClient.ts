import axios from 'axios';
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})
// USAR FUTURAMENTE PARA INTERCEPTAR E COLOCAR O TOKEN
// apiClient.interceptors.request.use((config) => {
// })


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('AXIOS ERROR:', error)
        return Promise.reject(error)
    }
)
export { apiClient }