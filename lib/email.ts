import { env, hasFormSubmitEnv } from "@/lib/env";

type PaidOrderEmailItem = {
  product_name: string;
  quantity: number;
  unit_price: number;
};

type PaidOrderEmailPayload = {
  buyerEmail: string;
  orderId: string;
  totalAmount: number;
  shippingAmount: number;
  discountAmount: number;
  items: PaidOrderEmailItem[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

function buildOrderMessage(payload: PaidOrderEmailPayload) {
  const items = payload.items
    .map(
      (item) =>
        `- ${item.product_name} x${item.quantity} (${formatCurrency(item.unit_price)})`
    )
    .join("\n");

  return [
    "Seu pedido foi fechado e pago com sucesso.",
    "",
    `Pedido: ${payload.orderId}`,
    `Total: ${formatCurrency(payload.totalAmount)}`,
    `Frete: ${formatCurrency(payload.shippingAmount)}`,
    `Desconto: ${formatCurrency(payload.discountAmount)}`,
    "",
    "Itens:",
    items || "- Nenhum item informado"
  ].join("\n");
}

export async function sendPaidOrderEmail(payload: PaidOrderEmailPayload) {
  if (!hasFormSubmitEnv()) {
    return;
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${env.formSubmitAccessToken}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: "Lumina Beautiful",
        email: env.formSubmitSenderEmail,
        _replyto: payload.buyerEmail,
        _cc: payload.buyerEmail,
        _subject: `Pedido pago #${payload.orderId}`,
        message: buildOrderMessage(payload)
      })
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao enviar o e-mail de confirmação do pedido.");
  }
}
