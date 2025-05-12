import { apiClient } from "@/lib";
import { authSignUpBody } from ".";

const router = '/auth/'
export const AuthPostSignUp = async (body: authSignUpBody) => {
    const { data } = await apiClient.post( `${router}signup`, body)
    return data
}