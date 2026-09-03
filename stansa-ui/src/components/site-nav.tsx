'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProductSearch } from './product-search';

const NAV_LINKS = [
  { href: '/#productos', label: 'Productos' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/#contacto', label: 'Contacto' },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`pt-safe fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'border-b border-hairline bg-surface/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="pl-safe pr-safe mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Aceros Stansa — Inicio">
          <span className="relative block h-9 w-9 md:h-10 md:w-10">
            <Image
              src="/logo.png"
              alt=""
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.05rem] font-medium text-bronze-800 md:text-lg">
              Aceros Stansa
            </span>
            <span className="mt-0.5 text-[0.62rem] tracking-[0.22em] text-iron uppercase">
              Monterrey · N.L.
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.92rem] text-ink-soft transition-colors hover:text-copper-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <ProductSearch onOpenChange={setSearchOpen} enabled={!scrolled} />

          <Link
            href="/#contacto"
            aria-hidden={searchOpen}
            tabIndex={searchOpen ? -1 : 0}
            className={`hidden items-center gap-2 rounded-full bg-bronze-800 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-copper-600 md:inline-flex ${
              searchOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            Solicitar cotización
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-ink transition-transform ${
                  mobileOpen ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-ink transition-transform ${
                  mobileOpen ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-hairline transition-[max-height] duration-300 md:hidden ${
          mobileOpen ? 'max-h-72' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Móvil">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-2 py-3 text-base text-ink-soft hover:bg-copper-50 hover:text-copper-600"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-bronze-800 px-5 py-3 text-sm font-medium text-white"
          >
            Solicitar cotización
          </Link>
        </nav>
      </div>
    </header>
  );
}
