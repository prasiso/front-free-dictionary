import { AlertService } from "@/services"

export async function logout() {
    await AlertService.emitAlert('Seu login expirou, você será redirecionado!', 'error')
    localStorage.clear()
    window.location.href = '/signin'
}