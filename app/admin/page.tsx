import { requireAdmin } from "@/lib/auth";
import { getProducts, getRecentOrders } from "@/lib/data/store";
import { AdminProductForm } from "@/components/admin/admin-product-form";
import { AdminRefundButton } from "@/components/admin/admin-refund-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default async function AdminPage() {
  await requireAdmin();
  const [products, orders] = await Promise.all([getProducts(), getRecentOrders()]);

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Admin simples</h1>
      <p className="mt-4 text-muted">
        Gestão de produtos, estoque e pedidos protegida por role de administrador.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle>Novo produto</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminProductForm />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle>Estoque atual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between rounded-2xl bg-secondary/50 px-4 py-3">
                  <span>{product.name}</span>
                  <span>{product.inventory_count} un.</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle>Pedidos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {orders.length === 0 ? (
                <p className="text-muted">Nenhum pedido sincronizado ainda.</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="rounded-2xl bg-secondary/50 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">#{order.id.slice(0, 8)}</span>
                      <span className="uppercase text-primary">{order.status}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-muted">{formatCurrency(order.total_amount)}</p>
                      <AdminRefundButton
                        orderId={order.id}
                        paymentIntentId={order.payment_intent_id}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
