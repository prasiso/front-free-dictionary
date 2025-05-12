"use client";

import AuthForm from "@/components/auth/AuthForm";
import { useRouter } from "next/navigation";
import { AuthPostSignUp, authSignUpBody } from "@/services";
export default function SignUpPage() {
  const router = useRouter();
  const handleSignUp = async (data: authSignUpBody) => {
      await AuthPostSignUp(data);
      router.push("/dashboard");
  };
  return (
    <AuthForm
      title="Cadastro"
      Submit={handleSignUp}
      linkText="Já tem conta? Faça Login"
      linkHref="/login"
      includeName={true}
    />
  );
}
