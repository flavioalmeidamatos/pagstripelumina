import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ phone }: { phone: string }) {
  return (
    <Link
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow transition hover:scale-105"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  );
}

