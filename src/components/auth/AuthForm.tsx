"use client";
import Link from "next/link";
import { AuthProps } from "./AuthType";
import { RegisterOptions, useForm } from "react-hook-form";
import { Input } from "../";
export default function AuthForm({
  title,
  Submit,
  linkText,
  linkHref,
  isSignUp = false,
}: AuthProps) {
  const { control, handleSubmit } = useForm();
  const rulesEmail: RegisterOptions = {
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Digite um e-mail válido",
    },
  };
  const rulesPass: RegisterOptions = {
    validate: (value) => {
      if (value.length < 8) return "A Senha deve ter pelo menos 8 caracteres";
      if (!/[A-Z]/.test(value))
        return "A senha deve conter pelo menos uma letra maiúscula.";
      if (!/[a-z]/.test(value)) {
        return "A senha deve conter pelo menos uma letra minúscula.";
      }
      if (!/[0-9]/.test(value)) {
        return "A senha deve conter pelo menos um número.";
      }
      if (!/[\W_]/.test(value)) {
        return "A senha deve conter pelo menos um caractere especial.";
      }
      return true;
    },
  };
  const onSubmit = (data: any) => {
    const { email, password, name } = data;
    Submit({ email, password, name });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4"> {title} </h1>
        {isSignUp && (
          <Input label="Nome" name="name" control={control} required />
        )}
        <Input
          label="Email"
          name="email"
          control={control}
          required
          rules={rulesEmail}
        />
        <Input
          label="Senha"
          name="password"
          type="password"
          showEye={true}
          control={control}
          required
          rules={rulesPass}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded mb-4">
          Entrar
        </button>
        <Link href={linkHref} className="text-sm text-blue-500 hover:underline">
          {linkText}
        </Link>
      </form>
    </div>
  );
}
