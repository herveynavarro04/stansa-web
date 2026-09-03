export type ProductCategory =
  | 'láminas'
  | 'placas'
  | 'perfiles'
  | 'tubos'
  | 'barras'
  | 'construcción'
  | 'especiales';

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  surface: 'metal-surface' | 'metal-surface--warm' | 'metal-surface--dark';
  /**
   * Public path (relative to /public) of a real product photo. When absent,
   * the CSS `surface` gradient is used as the visual instead.
   */
  image?: string;
};

/**
 * The slug is the exact xlsx filename (without extension) in /products-tables.
 * Keep this list in sync when a new xlsx file is added to /products-tables.
 */
export const PRODUCTS: Product[] = [
  { slug: 'lámina_caliente',              name: 'Lámina Caliente',              category: 'láminas',    tagline: 'Rolado en caliente para uso estructural.',              surface: 'metal-surface',        image: '/products/lamina_caliente.webp' },
  { slug: 'lámina_fría_lámina_de_acero',  name: 'Lámina Fría',                  category: 'láminas',    tagline: 'Acabado uniforme para trabajo fino.',                    surface: 'metal-surface',        image: '/products/lamina_fria.jpg' },
  { slug: 'lámina_galvanizada',           name: 'Lámina Galvanizada',           category: 'láminas',    tagline: 'Recubrimiento de zinc contra la corrosión.',             surface: 'metal-surface--warm',  image: '/products/lamina_galvanizada.jpg' },
  { slug: 'lámina_decapada',              name: 'Lámina Decapada',              category: 'láminas',    tagline: 'Superficie limpia lista para pintar o soldar.',          surface: 'metal-surface',        image: '/products/lamina_decapada.webp' },
  { slug: 'lámina_acanalada',             name: 'Lámina Acanalada',             category: 'láminas',    tagline: 'Perfil ondulado para techumbre y muro.',                 surface: 'metal-surface--warm',  image: '/products/lamina_acanalada.avif' },
  { slug: 'lámina_antiderrapante',        name: 'Lámina Antiderrapante',        category: 'láminas',    tagline: 'Relieve elevado para pisos y rampas.',                   surface: 'metal-surface--dark',  image: '/products/lamina_antiderrapante.jpg' },
  { slug: 'placa_de_hoja_placa_de_acero', name: 'Placa de Acero',               category: 'placas',     tagline: 'Espesores gruesos para aplicaciones exigentes.',         surface: 'metal-surface--dark',  image: '/products/placa_de_acero.jpg' },
  { slug: 'placa_de_rollo',               name: 'Placa de Rollo',               category: 'placas',     tagline: 'Placa proveniente de rollo, calibre estable.',           surface: 'metal-surface',        image: '/products/placa_de_rollo.jpg' },
  { slug: 'losacero_fortadeck',           name: 'Losacero',                     category: 'placas',     tagline: 'Lámina galvanizada para losa acero-concreto.',           surface: 'metal-surface--warm',  image: '/products/losacero.webp' },
  { slug: 'viga_ipr',                     name: 'Viga IPR',                     category: 'perfiles',   tagline: 'Perfil W de patín ancho, alta capacidad.',               surface: 'metal-surface--dark',  image: '/products/viga_ipr.jpg' },
  { slug: 'viga_ips',                     name: 'Viga IPS',                     category: 'perfiles',   tagline: 'Perfil I estándar para claros ligeros.',                 surface: 'metal-surface--dark',  image: '/products/viga_ips.webp' },
  { slug: 'canales_cps',                  name: 'Canales CPS',                  category: 'perfiles',   tagline: 'Canal estructural para estructuras y refuerzos.',        surface: 'metal-surface',        image: '/products/canal_cps.jpg' },
  { slug: 'ángulos',                      name: 'Ángulos',                      category: 'perfiles',   tagline: 'Ángulos de lados iguales para armazón y soporte.',       surface: 'metal-surface',        image: '/products/angulos.jpg' },
  { slug: 'polin_c',                      name: 'Polín C',                      category: 'perfiles',   tagline: 'Polín ligero en frío para cubiertas y muros.',           surface: 'metal-surface--warm',  image: '/products/polin_c.jpg' },
  { slug: 'ptr',                          name: 'PTR',                          category: 'tubos',      tagline: 'Perfil tubular rectangular estructural.',                surface: 'metal-surface--dark',  image: '/products/ptr.webp' },
  { slug: 'hss',                          name: 'HSS',                          category: 'tubos',      tagline: 'Sección hueca estructural, alto desempeño.',             surface: 'metal-surface--dark',  image: '/products/hss.jpg' },
  { slug: 'tubo',                         name: 'Tubo',                         category: 'tubos',      tagline: 'Tubería redonda para conducción y estructura.',          surface: 'metal-surface',        image: '/products/tubo.jpg' },
  { slug: 'redondos',                     name: 'Redondos',                     category: 'barras',     tagline: 'Barra sólida redonda, calibrada.',                       surface: 'metal-surface--warm',  image: '/products/redondos.jpg' },
  { slug: 'cuadrados',                    name: 'Cuadrados',                    category: 'barras',     tagline: 'Barra sólida cuadrada de acero al carbón.',              surface: 'metal-surface',        image: '/products/cuadrados.jpg' },
  { slug: 'soleras',                      name: 'Soleras',                      category: 'barras',     tagline: 'Barra plana laminada para herrería y estructura.',       surface: 'metal-surface',        image: '/products/soleras.webp' },
  { slug: 'solera_de_slitter',            name: 'Solera de Slitter',            category: 'barras',     tagline: 'Solera cortada a medida desde bobina.',                  surface: 'metal-surface--warm',  image: '/products/solera_de_slitter.webp' },
  { slug: 'varilla_corrugada',            name: 'Varilla Corrugada',            category: 'construcción', tagline: 'Refuerzo estructural para concreto armado.',           surface: 'metal-surface--dark',  image: '/products/varilla_corrugada.jpg' },
  { slug: 'varilla_grado_6000',           name: 'Varilla Grado 6000',           category: 'construcción', tagline: 'Alta resistencia para elementos exigentes.',           surface: 'metal-surface--dark',  image: '/products/varilla_grado_6000.jpeg' },
  { slug: 'alambrón',                     name: 'Alambrón',                     category: 'construcción', tagline: 'Materia prima para trefilado y estribos.',             surface: 'metal-surface',        image: '/products/alambron.jpg' },
  { slug: 'alambre_recocido',             name: 'Alambre Recocido',             category: 'construcción', tagline: 'Amarre flexible en calibres para obra.',               surface: 'metal-surface--warm',  image: '/products/alambre_recocido.webp' },
  { slug: 'malla_electrosoldada',         name: 'Malla Electrosoldada',         category: 'construcción', tagline: 'Refuerzo uniforme para losas y firmes.',               surface: 'metal-surface',        image: '/products/malla_electrosoldada.jpg' },
  { slug: 'hoja_para_castillo',           name: 'Hoja para Castillo',           category: 'construcción', tagline: 'Armex prefabricado para castillos y cadenas.',         surface: 'metal-surface--dark',  image: '/products/hoja_para_castillo.jpg' },
  { slug: 'clavo_con_cabeza',             name: 'Clavo con Cabeza',             category: 'construcción', tagline: 'Clavo estándar para carpintería y cimbra.',            surface: 'metal-surface',        image: '/products/clavo_con_cabeza.jpg' },
  { slug: 'clavo_para_concreto',          name: 'Clavo para Concreto',          category: 'construcción', tagline: 'Templado para fijación directa en muros.',             surface: 'metal-surface--dark',  image: '/products/clavo_para_concreto.jpg' },
  { slug: 'cinta_kr18',                   name: 'Cinta KR18',                   category: 'especiales', tagline: 'Cinta calibrada para procesos industriales.',            surface: 'metal-surface--dark',  image: '/products/cinta_kr18.jpg' },
  { slug: 'rejilla_electroforjada',       name: 'Rejilla Electroforjada',       category: 'especiales', tagline: 'Rejilla soldada por electrofusión, alta rigidez.',       surface: 'metal-surface',        image: '/products/rejilla_electroforjada.webp' },
  { slug: 'semi_flechas',                 name: 'Semi Flechas',                 category: 'especiales', tagline: 'Barra semi-terminada para maquinado de flechas.',        surface: 'metal-surface--warm',  image: '/products/semiflechas.jpg' },
  { slug: 'tablero',                      name: 'Tablero',                      category: 'especiales', tagline: 'Tablero de acero para aplicaciones especiales.',         surface: 'metal-surface--dark',  image: '/products/tablero.jpg' },
];

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  'láminas': 'Láminas',
  'placas': 'Placas',
  'perfiles': 'Perfiles estructurales',
  'tubos': 'Tubería estructural',
  'barras': 'Barras y soleras',
  'construcción': 'Materiales para construcción',
  'especiales': 'Productos especiales',
};

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
