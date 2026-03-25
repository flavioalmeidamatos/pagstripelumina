"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      toast.error("Supabase não configurado.");
      return;
    }

    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName
            }
          }
        });

        if (error) {
          throw error;
        }

        if (data.session) {
          toast.success("Conta criada com sucesso.");
          router.push(params.get("next") || "/account");
          router.refresh();
        } else {
          toast.success("Conta criada com sucesso. Faça login para continuar.");
          setMode("login");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          throw error;
        }

        toast.success("Login realizado com sucesso.");
        router.push(params.get("next") || "/account");
        router.refresh();
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha de autenticação.";

      if (message.toLowerCase().includes("rate limit")) {
        toast.error("Muitas tentativas em sequência. Aguarde um instante e tente novamente.");
        return;
      }

      if (message.toLowerCase().includes("already registered")) {
        toast.error("Este e-mail já está cadastrado. Tente entrar na sua conta.");
        setMode("login");
        return;
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-xl bg-white/90">
      <CardHeader>
        <CardTitle>{mode === "login" ? "Entrar na conta" : "Criar conta"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex gap-2">
          <Button
            type="button"
            variant={mode === "login" ? "default" : "outline"}
            onClick={() => setMode("login")}
          >
            Login
          </Button>
          <Button
            type="button"
            variant={mode === "signup" ? "default" : "outline"}
            onClick={() => setMode("signup")}
          >
            Cadastro
          </Button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div>
              <Label htmlFor="fullName">Nome completo</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading
              ? "Processando..."
              : mode === "login"
                ? "Entrar"
                : "Criar conta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
