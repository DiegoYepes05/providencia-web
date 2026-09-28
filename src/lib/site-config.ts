/**
 * Fuente de verdad de la marca. La comparten la landing y el e-commerce,
 * así que cambiar el nombre, los datos de contacto o el menú se hace solo aquí.
 */
export const siteConfig = {
  name: "Veltor",
  legalName: "Veltor",
  initial: "V",
  url: "https://veltor.co",
  tagline: "Movilidad eléctrica para Colombia",
  description:
    "Importamos y entregamos movilidad eléctrica: Nova, Confort y Carguero para el día a día en Colombia.",
  keywords: [
    "movilidad eléctrica",
    "moto eléctrica",
    "Veltor",
    "Colombia",
  ],
  contact: {
    email: "hola@veltor.co",
    phone: "+57 (601) 555 0142",
    address: "Calle 93 #13-45, Bogotá, Colombia",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "WhatsApp", href: "https://wa.me/573001112233" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

export const mainNav = [
  { label: "Modelos", href: "/#modelos" },
  { label: "Tecnología", href: "/#tecnologia" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Experiencia", href: "/#experiencia" },
  { label: "Tienda", href: "/shop" },
] as const;

export const shopNav = [
  { label: "Catálogo", href: "/shop" },
] as const;

export const shopCategories = [
  { label: "Catálogo", href: "/shop" },
  { label: "Nova", href: "/linea/nova" },
  { label: "Confort", href: "/linea/confort" },
  { label: "Carguero", href: "/linea/carguero" },
] as const;

export const shopCta = { label: "Ingresar", href: "/auth/login" } as const;
