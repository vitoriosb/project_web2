"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/services/http/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  username: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log(data);

      await auth(data.username, data.password);
      router.push("/private/deliveries");
    } catch (err) {
      setError("Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <PageHeader text="Login" description="Acesse sua conta" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <Input
              placeholder="Usuário"
              {...register("username", { required: "Usuário é obrigatório" })}
              className="w-full p-2 border border-gray-300 text-slate-950 rounded"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Senha"
              {...register("password", { required: "Senha é obrigatória" })}
              className="w-full p-2 border border-gray-300 text-slate-950 rounded"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
