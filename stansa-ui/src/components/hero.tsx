import Image from 'next/image';

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden bg-surface pt-24 pb-32 md:pt-32"
    >
      {/* Faint copper aura, single deliberate atmospheric element */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-15%] -z-0 h-[70vh] w-[70vh] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(184,115,51,0.22), rgba(184,115,51,0) 70%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-[1.15fr_1fr] md:gap-6 md:px-10 lg:gap-16">
        {/* Text stack — left */}
        <div className="max-w-2xl">
          <p className="mb-8 flex items-center gap-3 text-xs text-iron md:text-sm">
            <span className="h-px w-10 bg-copper-600" />
            Aceros Stansa · Monterrey, Nuevo León
          </p>

          <h1 className="font-display text-[2.6rem] leading-[1.02] text-bronze-900 md:text-[4.2rem] lg:text-[5.2rem]">
            El acero que
            <br />
            <span className="italic text-copper-600">sostiene</span> lo que
            <br />
            construyes.
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
            Distribución de acero estructural con la precisión, el respaldo y
            la disponibilidad que exige tu obra. Láminas, placas, perfiles,
            tubería y soleras — surtidos desde Monterrey.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#productos"
              className="inline-flex items-center gap-2 rounded-full bg-bronze-800 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-copper-600"
            >
              Ver catálogo
              <span aria-hidden>↓</span>
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-hairline-strong px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-copper-600 hover:text-copper-600"
            >
              Solicitar cotización
            </a>
          </div>
        </div>

        {/* Logo mark — hidden on phone/iPad; the mark still lives in the nav */}
        <div className="relative mx-auto hidden w-full max-w-[440px] items-center justify-center md:flex md:max-w-none">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full opacity-70 blur-2xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(212,130,60,0.28), transparent 70%)',
            }}
          />
          <div className="relative aspect-square w-full max-w-[420px] md:max-w-[520px]">
            <Image
              src="/logo.png"
              alt="Aceros Stansa"
              fill
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 420px, 320px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom meta strip — factual, not decorative */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-hairline bg-surface/60 backdrop-blur">
        <dl className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-hairline px-5 py-5 text-center md:px-10">
          <div className="px-2">
            <dt className="text-[0.68rem] tracking-[0.18em] text-iron uppercase">Experiencia</dt>
            <dd className="mt-1 font-display text-lg text-bronze-800 md:text-xl">+20 años</dd>
          </div>
          <div className="px-2">
            <dt className="text-[0.68rem] tracking-[0.18em] text-iron uppercase">Catálogo</dt>
            <dd className="mt-1 font-display text-lg text-bronze-800 md:text-xl">+30 productos</dd>
          </div>
          <div className="px-2">
            <dt className="text-[0.68rem] tracking-[0.18em] text-iron uppercase">Origen</dt>
            <dd className="mt-1 font-display text-lg text-bronze-800 md:text-xl">Monterrey</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
