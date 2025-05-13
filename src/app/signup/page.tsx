"use client";

import AuthForm from "@/components/auth/AuthForm";
import { useRouter } from "next/navigation";
import { AuthPostSignUp, authSignUpBody } from "@/services";
import { useUI } from "@/context/UIContext";
import { catchExcpetion, setUser } from "@/helper";
export default function SignUpPage() {
  const { showLoading, setLoading, showAlert } = useUI();
  const router = useRouter();
  const handleSignUp = async (data: authSignUpBody) => {
    try {
      await showLoading(async ()=> {
        const resp = await AuthPostSignUp(data);
        if(resp.token)
          setUser(resp)
      });
      showAlert({
        type: "success",
        message:
          "Usuário cadastrado com sucesso! você será redirecionado para o dashboard",
      });

      router.push("/dashboard");
    } catch (error) {
      const message = catchExcpetion(error);
      showAlert({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthForm
      title="Cadastro"
      Submit={handleSignUp}
      linkText="Já tem conta? Faça Login"
      linkHref="/signin"
      isSignUp={true}
    />
  );
}
