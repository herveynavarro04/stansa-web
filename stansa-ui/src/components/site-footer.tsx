import Image from 'next/image';
import { SOCIAL_CHANNELS } from '@/lib/channels';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative block h-8 w-8">
              <Image
                src="/logo.png"
                alt=""
                fill
                sizes="32px"
                className="object-contain"
              />
            </span>
            <div className="leading-tight">
              <p className="font-display text-base text-bronze-800">
                Aceros Stansa
              </p>
              <p className="text-xs text-iron">
                Acero estructural · Monterrey, N.L.
              </p>
            </div>
          </div>

          <ul className="flex items-center gap-1" aria-label="Redes sociales">
            {SOCIAL_CHANNELS.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.name}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.name} — ${c.handle}`}
                    title={`${c.name}: ${c.handle}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-iron transition-colors hover:bg-copper-50 hover:text-copper-600"
                  >
                    <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-iron md:flex-row md:items-center md:justify-between">
          <p>© {year} Aceros Stansa SA de CV · Todos los derechos reservados.</p>
          <p>Monterrey, Nuevo León · México</p>
        </div>
      </div>
    </footer>
  );
}
