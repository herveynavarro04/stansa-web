'use client';

import { useCallback, useEffect, useState } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { ALL_CHANNELS } from '@/lib/channels';

const STORAGE_KEY = 'stansa:brand-notice-seen';

export function AnnouncementModal() {
  const [open, setOpen] = useState(false);

  // On mount, check if the user has already seen the notice this session.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      // sessionStorage unavailable (privacy mode) — show anyway.
    }
    if (seen) return;
    const t = setTimeout(() => setOpen(true), 450);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setOpen(false);
  }, []);

  // Lock body scroll while open, compensating for the scrollbar so the page
  // behind doesn't shift sideways.
  useEffect(() => {
    if (!open) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPadding = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.setProperty(
        '--scrollbar-comp',
        `${scrollbarWidth}px`,
      );
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
      document.documentElement.style.removeProperty('--scrollbar-comp');
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ink/55 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stansa-notice-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative w-full max-w-lg border border-hairline-strong bg-surface shadow-[0_30px_80px_-20px_rgba(26,21,18,0.45)]">
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar aviso"
          className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-iron transition-colors hover:bg-copper-50 hover:text-copper-600"
        >
          <X className="h-4 w-4" strokeWidth={1.7} aria-hidden />
        </button>

        <div className="border-b border-hairline px-6 pt-7 pb-6 md:px-8 md:pt-9">
          <p className="flex items-center gap-2 text-[0.68rem] tracking-[0.22em] text-copper-600 uppercase">
            <ShieldAlert className="h-4 w-4" strokeWidth={1.7} aria-hidden />
            Aviso oficial
          </p>
          <h2
            id="stansa-notice-title"
            className="mt-3 max-w-md font-display text-2xl leading-tight text-bronze-900 md:text-3xl"
          >
            Canales oficiales de Aceros Stansa
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            La única página oficial de la marca es{' '}
            <a
              href="https://acerosstansa.com/"
              className="text-copper-600 underline-offset-2 hover:text-bronze-800 hover:underline"
            >
              acerosstansa.com
            </a>
            . Estos son nuestros canales verificados:
          </p>
        </div>

        <ul className="divide-y divide-hairline">
          {ALL_CHANNELS.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.name}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 px-6 py-3 text-sm transition-colors hover:bg-copper-50 md:px-8"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-copper-50 text-copper-600">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-medium text-ink">{c.name}</span>
                  </span>
                  <span className="truncate text-iron">{c.handle}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-hairline bg-surface-warm px-6 py-5 md:px-8 md:py-6">
          <p className="text-[0.78rem] leading-relaxed text-iron italic">
            &ldquo;Aceros Stansa se deslinda totalmente de cualquier oferta
            anunciada en otro portal que no sean estos.&rdquo;
          </p>
          <p className="mt-2 text-[0.66rem] tracking-[0.14em] text-iron-soft uppercase">
            Aceros Stansa SA de CV
          </p>
        </div>

        <div className="flex justify-end border-t border-hairline bg-surface px-6 py-4 md:px-8">
          <button
            type="button"
            onClick={close}
            className="inline-flex items-center justify-center rounded-full bg-bronze-800 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-copper-600"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
