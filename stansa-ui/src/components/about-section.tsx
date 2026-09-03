export function AboutSection() {
  return (
    <section
      id="nosotros"
      className="scroll-mt-20 bg-surface-warm py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <header className="mx-auto max-w-3xl">
          <p className="flex items-center gap-3 text-xs text-iron md:text-sm">
            <span className="h-px w-10 bg-copper-600" />
            Sobre nosotros
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-bronze-900 md:text-6xl">
            Tres años entregando
            <span className="italic text-copper-600"> acero </span>
            que responde.
          </h2>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-14 md:mt-20 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-display text-2xl text-bronze-800 md:text-3xl">
              Misión
            </h3>
            <p className="mt-4 max-w-[52ch] text-base leading-[1.75] text-ink-soft md:text-[1.06rem]">
              Abastecer a la industria de la construcción, la fabricación
              metálica y el sector industrial del noreste de México con acero
              estructural de calidad certificada, entregado a tiempo y con el
              acompañamiento técnico que cada proyecto merece. Nuestro
              compromiso es que cada tonelada que sale de Aceros Stansa sea
              una tonelada en la que puedes confiar.
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl text-bronze-800 md:text-3xl">
              Visión
            </h3>
            <p className="mt-4 max-w-[52ch] text-base leading-[1.75] text-ink-soft md:text-[1.06rem]">
              Consolidarnos como el aliado estratégico de referencia para quien
              construye en Nuevo León y en el norte del país, creciendo con la
              disciplina que ya nos distingue: inventario confiable, precios
              justos y una relación directa con quien dirige la obra. En pocos
              años queremos que decir Stansa sea decir acero disponible cuando
              y como se necesita.
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-3xl border-t border-hairline-strong pt-10 md:mt-20 md:pt-12">
          <p className="font-display text-2xl leading-snug text-bronze-900 md:text-3xl">
            &ldquo;En tres años pasamos de una bodega a un catálogo con 25
            líneas. Lo hicimos surtiendo lo prometido, en el calibre prometido,
            en la fecha prometida.&rdquo;
          </p>
          <p className="mt-4 text-sm text-iron">Dirección · Aceros Stansa</p>
        </div>
      </div>
    </section>
  );
}
