// @ts-nocheck
import { Stripe } from "stripe";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(process.cwd(), ".env.local") });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-11-20.acacia" as any
});

async function main() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "boleto", "pix"],
      success_url: `http://localhost:3000/?checkout=success`,
      cancel_url: `http://localhost:3000/cart?checkout=cancelled`,
      payment_intent_data: {
        metadata: {
          order_id: "test",
        }
      },
      metadata: {
        order_id: "test",
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: Math.round(24.9 * 100),
              currency: "brl"
            },
            display_name: "Frete fixo premium"
          }
        }
      ],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "brl",
            product_data: {
              name: "Test Product",
            },
            unit_amount: 10000
          }
        }
      ]
    });
    console.log("Success:", session.id);
  } catch (error) {
    console.error("Stripe Error Details:", error.message);
  }
}
main();
