"use client";

import AuthForm from "@/components/auth/AuthForm";
import { useRouter } from "next/navigation";
import { AuthPostSignUp, authSignUpBody } from "@/services";
import { useUI } from "@/context/UIContext";
export default function SignUpPage() {
  const { setLoading } = useUI();
  const router = useRouter();
  const handleSignUp = async (data: authSignUpBody) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await AuthPostSignUp(data);
      router.push("/dashboard");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthForm
      title="Cadastro"
      Submit={handleSignUp}
      linkText="Já tem conta? Faça Login"
      linkHref="/login"
      isSignUp={true}
    />
  );
}
