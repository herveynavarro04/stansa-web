import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/lib/products';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/productos/${encodeURIComponent(product.slug)}`}
      className="group relative flex flex-col overflow-hidden border border-hairline bg-surface transition-colors hover:border-copper-600"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-warm">
        {product.image ? (
          <>
            <Image
              src={product.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
            />
            {/* Top scrim so the category eyebrow stays legible over any photo */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bronze-950/45 to-transparent"
            />
          </>
        ) : (
          <div className={`absolute inset-0 ${product.surface}`}>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,0.28), transparent 60%)',
              }}
            />
          </div>
        )}

        <span className="absolute top-4 left-4 z-10 text-[0.62rem] tracking-[0.22em] text-white/90 uppercase">
          {product.category}
        </span>

        <span
          aria-hidden
          className="absolute right-3 bottom-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/40 text-white backdrop-blur transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-display text-2xl leading-tight text-bronze-900 transition-colors group-hover:text-copper-600">
            {product.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-iron">{product.tagline}</p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-hairline pt-4 text-sm font-medium text-copper-600">
          <span>Ver dimensiones</span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
