import { siteConfig } from "@/lib/site-config";

const whatsappMessage = encodeURIComponent(
  "Hola Veltor, quiero reservar en la preventa. Me interesa conocer disponibilidad y siguiente paso.",
);

export const preventa = {
  eyebrow: "Preventa 2026",
  headline: "Tu Veltor, antes que nadie.",
  body: "Aparta tu unidad Nova, Confort o Carguero. Te confirmamos disponibilidad, tiempos de entrega y el siguiente paso por WhatsApp.",
  ribbon: "Preventa abierta — reserva tu unidad",
  image: {
    src: "/products/veltor/nova/nova-800-negro.jpg",
    alt: "Veltor Nova 800 en preventa",
  },
  points: [
    { label: "Líneas", value: "Nova, Confort y Carguero" },
    { label: "Reserva", value: "Sin compromiso de compra inmediata" },
    { label: "Siguiente paso", value: "Te contactamos por WhatsApp" },
  ],
  actions: {
    whatsapp: {
      label: "Reservar por WhatsApp",
      href: `${siteConfig.social.find((item) => item.label === "WhatsApp")?.href}?text=${whatsappMessage}`,
    },
    page: { label: "Ver preventa", href: "/preventa" },
    catalog: { label: "Ver catálogo", href: "/shop" },
  },
} as const;
