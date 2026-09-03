'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { PRODUCTS, CATEGORY_LABEL } from '@/lib/products';

function normalize(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

type ProductSearchProps = {
  onOpenChange?: (open: boolean) => void;
  /**
   * When false, the trigger button is hidden and ⌘K is disabled. Any open
   * drawer state is treated as closed. Used to restrict the search to the
   * hero section only.
   */
  enabled?: boolean;
};

export function ProductSearch({
  onOpenChange,
  enabled = true,
}: ProductSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  // Effective open state — the drawer is only shown when the search is
  // enabled. If the user scrolls away from the hero while the drawer is
  // open, it collapses without needing an extra state write.
  const displayOpen = enabled && open;

  const openSearch = useCallback(() => {
    if (!enabled) return;
    setQuery('');
    setActiveIndex(0);
    setOpen(true);
  }, [enabled]);

  const closeSearch = useCallback(() => setOpen(false), []);

  const toggleSearch = useCallback(() => {
    if (!enabled) return;
    setQuery('');
    setActiveIndex(0);
    setOpen((v) => !v);
  }, [enabled]);

  // Emit open state to parent (SiteNav uses this to hide the CTA button)
  useEffect(() => {
    onOpenChange?.(displayOpen);
  }, [displayOpen, onOpenChange]);

  // Global keyboard shortcuts: ⌘K/Ctrl+K toggle (only when enabled), ESC close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isCmdK && enabled) {
        e.preventDefault();
        toggleSearch();
      } else if (e.key === 'Escape') {
        closeSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled, toggleSearch, closeSearch]);

  // When open: autofocus the input (without triggering a scroll), and close
  // on user-initiated scroll or clicks outside. We deliberately listen for
  // `wheel` and `touchmove` — not `scroll` — so that programmatic scrolls
  // (anchor navigation, focus-into-view) don't spuriously close the drawer.
  useEffect(() => {
    if (!displayOpen) return;

    const t = setTimeout(
      () => inputRef.current?.focus({ preventScroll: true }),
      60,
    );

    const dismissIfOutside = (e: Event) => {
      const target = e.target as Element | null;
      if (target?.closest('[data-search-part]')) return;
      setOpen(false);
    };

    window.addEventListener('pointerdown', dismissIfOutside);
    window.addEventListener('wheel', dismissIfOutside, { passive: true });
    window.addEventListener('touchmove', dismissIfOutside, { passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener('pointerdown', dismissIfOutside);
      window.removeEventListener('wheel', dismissIfOutside);
      window.removeEventListener('touchmove', dismissIfOutside);
    };
  }, [displayOpen]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) => {
      const hay = normalize(`${p.name} ${p.category} ${p.tagline}`);
      return hay.includes(q);
    });
  }, [query]);

  const safeActive =
    results.length === 0 ? 0 : Math.min(activeIndex, results.length - 1);

  const go = useCallback(
    (slug: string) => {
      setOpen(false);
      router.push(`/productos/${encodeURIComponent(slug)}`);
    },
    [router],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(Math.min(safeActive + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(Math.max(safeActive - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const hit = results[safeActive];
      if (hit) go(hit.slug);
    }
  };

  useEffect(() => {
    if (!displayOpen || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-idx="${safeActive}"]`,
    );
    el?.scrollIntoView({ block: 'nearest' });
  }, [safeActive, displayOpen]);

  return (
    <>
      <button
        type="button"
        data-search-part
        onClick={openSearch}
        aria-label="Buscar productos"
        aria-expanded={displayOpen}
        aria-hidden={!enabled || displayOpen}
        tabIndex={!enabled || displayOpen ? -1 : 0}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-opacity duration-300 hover:bg-copper-50 hover:text-copper-600 ${
          enabled && !displayOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <Search className="h-4 w-4" strokeWidth={1.7} aria-hidden />
      </button>

      {/* Ambient tint — visual only, never blocks interaction. */}
      <div
        aria-hidden
        className={`fixed inset-0 z-[55] bg-ink/[0.04] transition-opacity duration-300 pointer-events-none ${
          displayOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer — right-side glass panel */}
      <aside
        data-search-part
        role="dialog"
        aria-modal="false"
        aria-label="Buscar productos"
        aria-hidden={!displayOpen}
        inert={!displayOpen}
        className={`fixed inset-y-0 right-0 z-[60] flex w-full flex-col border-l border-hairline-strong bg-surface shadow-[-24px_0_60px_-24px_rgba(26,21,18,0.28)] transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[26rem] md:w-[30rem] lg:w-[34rem] lg:bg-surface/80 lg:backdrop-blur-2xl ${
          displayOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-safe">
          <div className="flex items-center gap-3 border-b border-hairline/70 px-5 py-1.5">
            <Search
              className="h-4 w-4 shrink-0 text-copper-600"
              strokeWidth={1.7}
              aria-hidden
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Buscar producto…"
              spellCheck={false}
              autoComplete="off"
              aria-label="Buscar producto"
              aria-autocomplete="list"
              aria-controls="search-results"
              aria-activedescendant={
                results[safeActive]
                  ? `search-item-${results[safeActive].slug}`
                  : undefined
              }
              className="w-full bg-transparent py-4 text-base text-ink placeholder:text-iron-soft focus:outline-none md:text-lg"
            />
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Cerrar búsqueda"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-iron transition-colors hover:bg-copper-50 hover:text-copper-600"
            >
              <X className="h-4 w-4" strokeWidth={1.7} aria-hidden />
            </button>
          </div>
        </div>

        <ul
          ref={listRef}
          id="search-results"
          role="listbox"
          className="flex-1 overflow-y-auto overscroll-contain"
        >
          {results.length === 0 ? (
            <li className="px-5 py-14 text-center text-sm text-iron">
              Sin resultados para{' '}
              <span className="text-ink">&ldquo;{query}&rdquo;</span>
            </li>
          ) : (
            results.map((p, i) => {
              const isActive = i === safeActive;
              return (
                <li key={p.slug} data-idx={i}>
                  <button
                    type="button"
                    id={`search-item-${p.slug}`}
                    role="option"
                    aria-selected={isActive}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => go(p.slug)}
                    className={`flex w-full items-center justify-between gap-4 border-b border-hairline/70 px-5 py-4 text-left transition-colors ${
                      isActive ? 'bg-copper-50/70' : 'bg-transparent'
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-base text-bronze-900 md:text-lg">
                        {p.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-iron">
                        {CATEGORY_LABEL[p.category]}
                      </span>
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        isActive ? 'text-copper-600' : 'text-iron-soft'
                      }`}
                      strokeWidth={1.6}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className="pb-safe border-t border-hairline/70 bg-surface lg:bg-surface/60 lg:backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-5 py-3 text-[0.7rem] text-iron">
            <span>
              {results.length}{' '}
              {results.length === 1 ? 'resultado' : 'resultados'}
            </span>
            <span className="hidden items-center gap-3 sm:inline-flex">
              <span className="inline-flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" strokeWidth={1.8} aria-hidden />
                para abrir
              </span>
              <span>·</span>
              <span>ESC para cerrar</span>
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
