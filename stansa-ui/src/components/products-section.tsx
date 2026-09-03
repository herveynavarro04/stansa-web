import { PRODUCTS, CATEGORY_LABEL, type ProductCategory } from '@/lib/products';
import { ProductCard } from './product-card';

const CATEGORY_ORDER: ProductCategory[] = [
  'láminas',
  'placas',
  'perfiles',
  'tubos',
  'barras',
  'construcción',
  'especiales',
];

export function ProductsSection() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABEL[cat],
    items: PRODUCTS.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="productos" className="scroll-mt-20 bg-surface py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <header className="mx-auto max-w-3xl">
          <p className="flex items-center gap-3 text-xs text-iron md:text-sm">
            <span className="h-px w-10 bg-copper-600" />
            Catálogo completo
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-bronze-900 md:text-6xl">
            Nuestros productos
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            Selecciona un producto para revisar su tabla completa de medidas,
            calibres y pesos. Trabajamos con proveedores nacionales y podemos
            cortar a medida según los requisitos de tu proyecto.
          </p>
        </header>

        <div className="mt-16 space-y-20 md:mt-20">
          {grouped.map((group) => (
            <div key={group.category}>
              <div className="mb-8 flex items-baseline justify-between border-b border-hairline pb-4">
                <h3 className="font-display text-xl text-bronze-800 md:text-2xl">
                  {group.label}
                </h3>
                <span className="text-xs text-iron">
                  {group.items.length}{' '}
                  {group.items.length === 1 ? 'producto' : 'productos'}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
