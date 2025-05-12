'use client'

import AuthForm from "@/components/auth/AuthForm";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const handleSignUp = (data) => {
    console.log(data)
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
