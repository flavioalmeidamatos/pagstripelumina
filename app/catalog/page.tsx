import { FilterBar } from "@/components/store/filter-bar";
import { ProductGrid } from "@/components/store/product-grid";
import { Badge } from "@/components/ui/badge";
import { getCategories, getProducts } from "@/lib/data/store";

export default async function CatalogPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      category: typeof params.category === "string" ? params.category : undefined,
      brand: typeof params.brand === "string" ? params.brand : undefined,
      minRating:
        typeof params.rating === "string" ? Number(params.rating) : undefined,
      featuredOnly: params.featured === "true",
      search: typeof params.search === "string" ? params.search : undefined
    })
  ]);

  return (
    <div className="container py-12">
      <Badge>Catálogo</Badge>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
        Descubra maquiagem, skincare, kits e perfumes
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Filtros por categoria, marca, preço e avaliação para facilitar a compra.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[300px_1fr]">
        <FilterBar
          categories={categories}
          selectedCategory={typeof params.category === "string" ? params.category : undefined}
          selectedBrand={typeof params.brand === "string" ? params.brand : undefined}
        />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

