import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { env } from "@/lib/env";
import { sendPaidOrderEmail } from "@/lib/email";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const stripe = getStripe();
  // The generated Database type is not complete enough for typed webhook mutations.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createSupabaseAdminClient() as any;
  const signature = (await headers()).get("stripe-signature");

  if (!stripe || !supabase || !env.stripeWebhookSecret || !signature) {
    return NextResponse.json({ error: "Webhook não configurado." }, { status: 400 });
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.stripeWebhookSecret
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Assinatura inválida." },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (orderId) {
      const { data: order } = await supabase
        .from("orders")
        .select("id, status, total_amount, shipping_amount, discount_amount")
        .eq("id", orderId)
        .maybeSingle();

      await supabase
        .from("orders")
        .update({
          status: "paid",
          stripe_session_id: session.id,
          payment_intent_id:
            typeof session.payment_intent === "string" ? session.payment_intent : null
        })
        .eq("id", orderId);

      await supabase
        .from("payments")
        .update({
          provider_status: session.payment_status,
          payment_intent_id:
            typeof session.payment_intent === "string" ? session.payment_intent : null
        })
        .eq("order_id", orderId);

      const buyerEmail = session.customer_details?.email ?? session.customer_email;

      if (buyerEmail && order?.status !== "paid") {
        const { data: items } = await supabase
          .from("order_items")
          .select("product_name, quantity, unit_price")
          .eq("order_id", orderId);

        await sendPaidOrderEmail({
          buyerEmail,
          orderId,
          totalAmount: Number(order?.total_amount ?? 0),
          shippingAmount: Number(order?.shipping_amount ?? 0),
          discountAmount: Number(order?.discount_amount ?? 0),
          items:
            items?.map(
              (item: { product_name: string; quantity: number; unit_price: number }) => ({
                product_name: item.product_name,
                quantity: item.quantity,
                unit_price: Number(item.unit_price)
              })
            ) ?? []
        }).catch((error) => {
          console.error("Erro ao enviar confirmação por e-mail:", error);
        });
      }
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const orderId = paymentIntent.metadata.order_id;

    if (orderId) {
      await supabase
        .from("orders")
        .update({
          status: "failed",
          payment_intent_id: paymentIntent.id
        })
        .eq("id", orderId);

      await supabase
        .from("payments")
        .update({
          provider_status: paymentIntent.status,
          payment_intent_id: paymentIntent.id
        })
        .eq("order_id", orderId);
    }
  }

  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    const paymentIntentId =
      typeof charge.payment_intent === "string" ? charge.payment_intent : null;

    if (paymentIntentId) {
      const { data: payment } = await supabase
        .from("payments")
        .select("*")
        .eq("payment_intent_id", paymentIntentId)
        .maybeSingle();

      if (payment) {
        await supabase
          .from("orders")
          .update({ status: "refunded" })
          .eq("id", payment.order_id);

        await supabase
          .from("payments")
          .update({
            provider_status: charge.status,
            refund_id: charge.refunds?.data?.[0]?.id ?? null
          })
          .eq("id", payment.id);
      }
    }
  }

  return NextResponse.json({ received: true });
}
