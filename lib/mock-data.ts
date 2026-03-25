import type { Product } from "@/types/domain";
import { categoriesSeed } from "@/lib/site";

const skincare = categoriesSeed[0];
const maquiagem = categoriesSeed[1];
const kits = categoriesSeed[2];
const perfumes = categoriesSeed[3];

export const fallbackProducts: Product[] = [
  {
    id: "prod-botanical-serum",
    slug: "serum-botanical-radiance",
    name: "Serum Botanical Radiance",
    subtitle: "Vitamina C encapsulada e peptídeos para glow uniforme.",
    description:
      "Sérum de acabamento sedoso com ativos antioxidantes, pensado para iluminar, suavizar poros e reforçar a barreira cutânea com toque premium.",
    brand: "Lumina Beaute",
    price: 189.9,
    compare_at_price: 229.9,
    rating: 4.9,
    reviews_count: 128,
    inventory_count: 23,
    is_featured: true,
    is_kit: false,
    category_id: skincare.id,
    category: skincare,
    images: [
      {
        id: "img-1",
        image_url:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Serum de skincare premium",
        sort_order: 0
      }
    ],
    reviews: [
      {
        id: "review-1",
        rating: 5,
        title: "Pele mais luminosa em uma semana",
        content:
          "Textura perfeita e resultado visível sem pesar. Virou meu produto principal na rotina da manhã.",
        author_name: "Marina S.",
        created_at: new Date().toISOString()
      }
    ]
  },
  {
    id: "prod-velvet-foundation",
    slug: "base-velvet-skin",
    name: "Base Velvet Skin",
    subtitle: "Cobertura média luminosa com longa duração.",
    description:
      "Base premium com acabamento viçoso, construída para uniformizar a pele com conforto e performance profissional.",
    brand: "Maison Glow",
    price: 169.9,
    compare_at_price: null,
    rating: 4.8,
    reviews_count: 84,
    inventory_count: 31,
    is_featured: true,
    is_kit: false,
    category_id: maquiagem.id,
    category: maquiagem,
    images: [
      {
        id: "img-2",
        image_url:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Base de maquiagem premium",
        sort_order: 0
      }
    ]
  },
  {
    id: "prod-night-ritual-kit",
    slug: "kit-night-renewal",
    name: "Kit Night Renewal",
    subtitle: "Limpeza, sérum e creme reparador para o ritual noturno.",
    description:
      "Kit promocional para rotina de renovação com três etapas complementares focadas em textura, elasticidade e hidratação intensa.",
    brand: "Lumina Beaute",
    price: 329.9,
    compare_at_price: 399.9,
    rating: 4.9,
    reviews_count: 63,
    inventory_count: 17,
    is_featured: true,
    is_kit: true,
    category_id: kits.id,
    category: kits,
    images: [
      {
        id: "img-3",
        image_url:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Kit premium de skincare",
        sort_order: 0
      }
    ]
  },
  {
    id: "prod-fleur-noire",
    slug: "perfume-fleur-noire",
    name: "Perfume Fleur Noire",
    subtitle: "Jasmim cremoso, madeiras claras e musk aveludado.",
    description:
      "Fragrância feminina moderna com assinatura elegante para uso diário e ocasiões especiais.",
    brand: "Atelier Essence",
    price: 259.9,
    compare_at_price: null,
    rating: 4.7,
    reviews_count: 51,
    inventory_count: 14,
    is_featured: false,
    is_kit: false,
    category_id: perfumes.id,
    category: perfumes,
    images: [
      {
        id: "img-4",
        image_url:
          "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80",
        alt_text: "Perfume feminino premium",
        sort_order: 0
      }
    ]
  }
];

export const defaultCoupons = [
  {
    code: "LUXE10",
    discountType: "percentage" as const,
    discountValue: 10
  },
  {
    code: "WELCOME25",
    discountType: "fixed" as const,
    discountValue: 25
  }
];

