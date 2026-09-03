import { MapPin, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from './brand-icons';
import { WHATSAPP_NUMBER, WHATSAPP_HREF } from '@/lib/channels';

const CONTACT_ITEMS = [
  {
    icon: WhatsAppIcon,
    eyebrow: 'WhatsApp',
    value: WHATSAPP_NUMBER,
    href: WHATSAPP_HREF,
    hint: 'Lun a Vie · 8:00 – 18:00',
  },
  {
    icon: Mail,
    eyebrow: 'Correo',
    value: 'ventas@acerosstansa.com',
    href: 'mailto:ventas@acerosstansa.com?subject=Solicitud%20de%20cotizaci%C3%B3n',
    hint: 'Respuesta el mismo día hábil',
  },
  {
    icon: MapPin,
    eyebrow: 'Ubicación',
    value: 'Monterrey, Nuevo León',
    href: 'https://www.google.com/maps/search/?api=1&query=Monterrey%2C+Nuevo+Le%C3%B3n',
    hint: 'México · Zona metropolitana',
  },
  {
    icon: Clock,
    eyebrow: 'Horario',
    value: 'Lun – Vie · 8 a 18 h',
    href: null,
    hint: 'Sábado · 9 a 14 h',
  },
] as const;

export function ContactSection() {
  return (
    <section id="contacto" className="scroll-mt-20 bg-surface py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <header className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs text-iron md:text-sm">
              <span className="h-px w-10 bg-copper-600" />
              Contacto
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-bronze-900 md:text-6xl">
              Habla con nosotros.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              Cotizamos por producto, medida y volumen. Comparte tu
              requerimiento y te respondemos con precio y tiempo de entrega el
              mismo día hábil.
            </p>
          </header>

          <a
            href="mailto:ventas@acerosstansa.com?subject=Solicitud%20de%20cotizaci%C3%B3n"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-bronze-800 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-copper-600 md:self-end"
          >
            Solicitar cotización
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
          </a>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-hairline-strong bg-hairline-strong sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_ITEMS.map((item) => {
            const Icon = item.icon;
            const inner = (
              <div className="flex h-full flex-col justify-between gap-8 bg-surface p-7 transition-colors hover:bg-copper-50">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-copper-50 text-copper-600">
                    <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                  </span>
                  {item.href && (
                    <ArrowUpRight
                      className="h-4 w-4 text-iron-soft"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                  )}
                </div>
                <div>
                  <p className="text-[0.68rem] tracking-[0.2em] text-iron uppercase">
                    {item.eyebrow}
                  </p>
                  <p className="mt-2 font-display text-lg text-bronze-900 md:text-xl">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs text-iron">{item.hint}</p>
                </div>
              </div>
            );

            return (
              <li key={item.eyebrow} className="h-full">
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="h-full">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
