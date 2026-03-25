import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser, getCurrentProfile } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortalButton } from "@/components/store/portal-button";

export default async function AccountPage() {
  const user = await requireUser();
  const profile = await getCurrentProfile();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container py-12">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-white/90">
          <CardHeader>
            <CardTitle>Minha conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted">
            <p><strong className="text-foreground">E-mail:</strong> {user.email}</p>
            <p><strong className="text-foreground">Nome:</strong> {profile?.full_name ?? "Não informado"}</p>
            <p><strong className="text-foreground">Role:</strong> {profile?.role ?? "customer"}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle>Ações rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/account/orders">Meus pedidos</Link>
            </Button>
            <PortalButton />
            {profile?.role === "admin" && (
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin">Abrir admin</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

