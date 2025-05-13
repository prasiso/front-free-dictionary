"use client";

import AuthForm from "@/components/auth/AuthForm";
import { useUI } from "@/context/UIContext";
import { catchExcpetion } from "@/helper";
import {
  AuthPostSignIn,
  authSignInBody,
} from "@/services";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const router = useRouter();
  const { showLoading, setLoading, showAlert } = useUI();
  const handleSignIn = async (data: authSignInBody) => {
    try {
      await showLoading(async () => {
        const resp = await AuthPostSignIn(data);
        localStorage.setItem("user", JSON.stringify(resp));
      });
      await showAlert({
        type: "success",
        message:
          "Usuário encontrado com sucesso, você será redirecionado ao dashboard!",
      });
      router.push('/dashboard')
    } catch (error) {
      const message = catchExcpetion(error);
      showAlert({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthForm
      title="Login"
      Submit={handleSignIn}
      linkText="Não tem conta? Cadastre-se"
      linkHref="/signup"
      isSignUp={false}
    />
  );
}
