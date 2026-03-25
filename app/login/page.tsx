import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <div className="container py-12">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight">Login e cadastro</h1>
        <p className="mt-4 text-muted">
          Entre para salvar favoritos, acompanhar pedidos e acessar cobranças no portal.
        </p>
      </div>
      <AuthForm />
    </div>
  );
}

