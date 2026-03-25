import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";
import { PromoBanner } from "@/components/store/promo-banner";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { getSiteSettings } from "@/lib/data/store";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumina-beaute.vercel.app"),
  title: {
    default: "Lumina Beaute | E-commerce premium de cosméticos",
    template: "%s | Lumina Beaute"
  },
  description:
    "Loja premium de skincare, maquiagem, kits e perfumes com experiência elegante, checkout Stripe e gestão integrada com Supabase.",
  openGraph: {
    title: "Lumina Beaute",
    description:
      "Compre cosméticos premium em uma experiência moderna, segura e mobile-first.",
    type: "website"
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <PromoBanner message={settings.promoBanner} />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton phone={settings.whatsappNumber} />
        </Providers>
      </body>
    </html>
  );
}

