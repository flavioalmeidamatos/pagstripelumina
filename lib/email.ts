import { env, hasFormSubmitEnv } from "@/lib/env";

const VALIDATED_FORMSUBMIT_ENDPOINT = "https://formsubmit.co/el/tumohu";

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

async function submitFormSubmit(
  endpoint: string,
  payload: PaidOrderEmailPayload
) {
  const message = buildOrderMessage(payload);
  const formData = new URLSearchParams();
  formData.set("name", "Lumina Beautiful");
  formData.set("email", payload.buyerEmail);
  formData.set("_autoresponse", "Obrigado por comprar conosco! O seu pedido foi confirmado.\n\n" + message);
  formData.set("_replyto", payload.buyerEmail);
  formData.set("_subject", `Pedido pago #${payload.orderId} - Lumina Beautiful`);
  formData.set("_url", env.siteUrl);
  formData.set("message", message);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: env.siteUrl,
      Referer: `${env.siteUrl}/`
    },
    body: formData,
    redirect: "manual"
  });

  const contentType = response.headers.get("content-type") ?? "";
  const bodyText = await response.text();

  if (![200, 302].includes(response.status)) {
    throw new Error(`FormSubmit retornou status ${response.status}.`);
  }

  if (contentType.includes("application/json")) {
    try {
      const result = JSON.parse(bodyText) as { success?: string | boolean; message?: string };
      if (result.success === false || result.success === "false") {
        throw new Error(result.message || "FormSubmit rejeitou o envio.");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  if (bodyText.includes("\"success\":\"false\"")) {
    throw new Error("FormSubmit respondeu sucesso=false.");
  }

  return {
    status: response.status,
    location: response.headers.get("location")
  };
}

export async function sendPaidOrderEmail(payload: PaidOrderEmailPayload) {
  if (!hasFormSubmitEnv()) {
    return;
  }

  try {
    return await submitFormSubmit(env.formSubmitEndpoint, payload);
  } catch (primaryError) {
    if (env.formSubmitEndpoint === VALIDATED_FORMSUBMIT_ENDPOINT) {
      throw primaryError;
    }

    console.warn("Falha no endpoint principal do FormSubmit, tentando fallback validado.", {
      orderId: payload.orderId,
      error: primaryError instanceof Error ? primaryError.message : String(primaryError)
    });

    return submitFormSubmit(VALIDATED_FORMSUBMIT_ENDPOINT, payload);
  }
}
