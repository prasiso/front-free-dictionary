"use client";
import Link from "next/link";
import { AuthProps } from "./AuthType";
import { useForm } from "react-hook-form";
import { Input } from "../";
export default function AuthForm({
  title,
  Submit,
  linkText,
  linkHref,
  includeName = false,
}: AuthProps) {
  const { control, handleSubmit } = useForm();
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
        {includeName && (
          <Input label="Nome" name="name" control={control} required />
        )}
        <Input label="Email" name="email" control={control} required />
        <Input label="Senha" name="password" type="password" showEye={true} control={control} required />
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
