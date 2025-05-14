import { AlertService } from "@/services"

export async function logout(expire = true) {
    const message = expire? 'Seu login expirou, você será redirecionado!': 'Você será redirecionado a tela de login!'
    await AlertService.emitAlert(message, 'error')
    localStorage.clear()
    window.location.href = '/signin'
}