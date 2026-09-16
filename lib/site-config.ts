/**
 * Fuente de verdad de la marca. La comparten la landing y el e-commerce,
 * así que cambiar el nombre, los datos de contacto o el menú se hace solo aquí.
 */
export const siteConfig = {
  name: "Providencia",
  legalName: "Providencia Global Importaciones S.A.S.",
  initial: "P",
  /** Se usa para resolver URLs absolutas de Open Graph. */
  url: "https://providencia.co",
  tagline: "Infraestructura digital para empresas",
  description:
    "Providencia unifica datos, automatización y seguridad en una sola plataforma modular. Lanza más rápido, opera con menos fricción y toma decisiones con información real.",
  keywords: [
    "infraestructura digital",
    "software B2B",
    "automatización",
    "plataforma modular",
  ],
  contact: {
    email: "hola@providencia.co",
    phone: "+57 (601) 555 0142",
    address: "Calle 93 #13-45, Bogotá, Colombia",
  },
  social: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "X", href: "https://x.com" },
  ],
} as const;

/** Menú del sitio corporativo. `/productos` ya apunta al grupo (shop). */
export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const primaryCta = { label: "Agendar demo", href: "/contacto" } as const;
