import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { PRODUCTS, CATEGORY_LABEL, getProductBySlug } from '@/lib/products';
import { readProductTable } from '@/lib/excel';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(decodeURIComponent(slug));
  if (!product) return { title: 'Producto no encontrado — Aceros Stansa' };
  return {
    title: `${product.name} — Aceros Stansa`,
    description: `Medidas, calibres y pesos disponibles de ${product.name}. ${product.tagline}`,
    alternates: {
      canonical: `/productos/${encodeURIComponent(product.slug)}`,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const product = getProductBySlug(decoded);
  if (!product) notFound();

  const table = readProductTable(decoded);
  const hasTable = Boolean(table && table.headers.length > 0 && table.rows.length > 0);
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 3);

  return (
    <>
      <SiteNav />
      <main className="bg-surface pt-24 md:pt-28">
        {/* Header */}
        <section className="border-b border-hairline bg-surface">
          <div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-14 md:px-10 md:pt-10 md:pb-20">
            <Link
              href="/#productos"
              className="inline-flex items-center gap-2 text-sm text-iron transition-colors hover:text-copper-600"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.6} aria-hidden />
              Volver al catálogo
            </Link>

            <div className="mt-8 grid grid-cols-1 items-end gap-8 md:mt-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
              <div>
                <p className="flex items-center gap-3 text-xs text-iron md:text-sm">
                  <span className="h-px w-10 bg-copper-600" />
                  {CATEGORY_LABEL[product.category]}
                </p>
                <h1 className="mt-4 font-display text-5xl leading-[1.02] text-bronze-900 md:text-7xl">
                  {product.name}
                </h1>
                <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-ink-soft md:text-lg">
                  {product.tagline}
                </p>
              </div>

              {/* Visual — subtle, does not compete with the table below */}
              <div
                className={`relative hidden aspect-[16/10] w-full overflow-hidden md:block ${
                  product.image ? 'bg-surface-warm' : product.surface
                }`}
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 40vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,0.28), transparent 60%)',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Dimensions table — the main content */}
        <section className="bg-surface-warm py-16 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
            <div className="mb-6 flex items-end justify-between border-b border-hairline-strong pb-4">
              <div>
                <h2 className="font-display text-2xl text-bronze-800 md:text-3xl">
                  Medidas disponibles
                </h2>
                {hasTable && (
                  <p className="mt-1 text-sm text-iron">
                    {table!.rows.length}{' '}
                    {table!.rows.length === 1 ? 'medida' : 'medidas'}                   
                  </p>
                )}
              </div>
              <a
                href="#solicitar"
                className="hidden text-sm font-medium text-copper-600 hover:text-bronze-800 sm:inline"
              >
                Solicitar esta medida →
              </a>
            </div>

            {hasTable ? (
              <div className="relative overflow-hidden border border-hairline-strong bg-surface shadow-[0_1px_0_rgba(92,46,20,0.04)]">
                {/* Horizontal scroll only if a table is unusually wide;
                    generous inner padding keeps things breathable */}
                <div className="max-h-[70vh] overflow-auto">
                  <table className="dim-table">
                    <thead>
                      <tr>
                        {table!.headers.map((h, i) => (
                          <th key={`${h}-${i}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table!.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td key={ci}>{cell === '' ? '—' : cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="border border-hairline-strong bg-surface p-10 text-center">
                <p className="mx-auto max-w-md text-base text-iron">
                  Estamos actualizando la tabla de dimensiones de este producto.{' '}
                  <a
                    href="#solicitar"
                    className="text-copper-600 hover:text-bronze-800"
                  >
                    Solicítanos medidas específicas
                  </a>
                  .
                </p>
              </div>
            )}

            <p className="mt-6 max-w-2xl text-xs leading-relaxed text-iron">
              Los valores mostrados son referenciales y provienen de tablas de
              fabricante. La disponibilidad de calibres y medidas puede variar
              por existencias; confirma con nuestro equipo comercial antes de
              cerrar una compra.
            </p>
          </div>
        </section>

        {/* Solicit CTA */}
        <section id="solicitar" className="border-t border-hairline bg-surface py-20 md:py-28">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-5 md:grid-cols-[1.3fr_1fr] md:gap-16 md:px-10">
            <div>
              <p className="flex items-center gap-3 text-xs text-iron md:text-sm">
                <span className="h-px w-10 bg-copper-600" />
                Cotización
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-bronze-900 md:text-5xl">
                ¿Necesitas {product.name.toLowerCase()} para tu obra?
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
                Envíanos la medida, el calibre y el volumen aproximado.
                Respondemos con precio y tiempo de entrega el mismo día hábil.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3">
              <a
                href={`mailto:ventas@acerosstansa.com?subject=Cotizaci%C3%B3n%20${encodeURIComponent(
                  product.name,
                )}`}
                className="inline-flex items-center justify-between gap-3 border border-hairline-strong bg-surface px-5 py-4 text-left transition-colors hover:border-copper-600"
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-copper-600" strokeWidth={1.6} aria-hidden />
                  <span>
                    <span className="block text-[0.66rem] tracking-[0.18em] text-iron uppercase">
                      Correo
                    </span>
                    <span className="mt-0.5 block text-sm text-ink">
                      ventas@acerosstansa.com
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-iron" strokeWidth={1.6} aria-hidden />
              </a>

              <a
                href="tel:+528118000000"
                className="inline-flex items-center justify-between gap-3 border border-hairline-strong bg-surface px-5 py-4 text-left transition-colors hover:border-copper-600"
              >
                <span className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-copper-600" strokeWidth={1.6} aria-hidden />
                  <span>
                    <span className="block text-[0.66rem] tracking-[0.18em] text-iron uppercase">
                      Teléfono
                    </span>
                    <span className="mt-0.5 block text-sm text-ink">
                      +52 81 1254 7695
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-iron" strokeWidth={1.6} aria-hidden />
              </a>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-hairline bg-surface-warm py-20 md:py-24">
            <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
              <div className="mb-8 flex items-baseline justify-between border-b border-hairline pb-4">
                <h2 className="font-display text-xl text-bronze-800 md:text-2xl">
                  Más en {CATEGORY_LABEL[product.category].toLowerCase()}
                </h2>
                <Link
                  href="/#productos"
                  className="text-sm text-copper-600 hover:text-bronze-800"
                >
                  Ver catálogo completo →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/productos/${encodeURIComponent(rel.slug)}`}
                    className="group flex items-center justify-between gap-6 border border-hairline bg-surface p-6 transition-colors hover:border-copper-600"
                  >
                    <div>
                      <p className="text-[0.62rem] tracking-[0.22em] text-iron uppercase">
                        {rel.category}
                      </p>
                      <h3 className="mt-2 font-display text-xl leading-tight text-bronze-900 group-hover:text-copper-600">
                        {rel.name}
                      </h3>
                    </div>
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-iron transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
