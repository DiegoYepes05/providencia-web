/**
 * Mock del Content Type "Producto" de Strapi.
 *
 * La forma imita una respuesta de Strapi v5 (campos planos + `documentId` +
 * media con `url`/`alternativeText`/`width`/`height`), así que al conectar el
 * CMS real solo se reemplaza `productos` por el fetch y los componentes siguen
 * funcionando sin cambios.
 */

export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText: string;
  width: number;
  height: number;
};

export type SpecIcono =
  | "autonomia"
  | "velocidad"
  | "motor"
  | "carga"
  | "peso"
  | "capacidad";

export type FeatureIcono =
  | "freno"
  | "suspension"
  | "tablero"
  | "bateria"
  | "portaequipaje"
  | "luces";

export type ProductoColor = {
  id: number;
  nombre: string;
  slug: string;
  /** Color del swatch. `hexSecundario` solo se usa en variantes bitono. */
  hex: string;
  hexSecundario: string | null;
  /** Acento de interfaz mientras esta variante está seleccionada. */
  acento: string;
  acentoSuave: string;
  imagen: StrapiMedia;
};

export type ProductoSpec = {
  id: number;
  clave: string;
  etiqueta: string;
  valor: number;
  decimales: number;
  unidad: string;
  icono: SpecIcono;
};

export type ProductoFeature = {
  id: number;
  titulo: string;
  descripcion: string;
  icono: FeatureIcono;
};

export type ProductoCasoDeUso = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: StrapiMedia;
};

export type ProductoVariante = {
  id: number;
  nombre: string;
  autonomiaKm: number;
  velocidadKmh: number;
  potenciaW: number;
  precio: number;
  destacada: boolean;
};

export type ProductoPrecio = {
  valor: number;
  moneda: "COP";
  desde: boolean;
};

export type ProductoCta = {
  principal: { etiqueta: string; href: string };
  secundario: { etiqueta: string; href: string };
  whatsapp: { etiqueta: string; telefono: string; mensaje: string };
};

export type ProductoReserva = {
  disponible: boolean;
  etiqueta: string;
  deposito: number;
  vigenciaDias: number;
  ciudades: string[];
  horarios: string[];
  pasos: { id: number; titulo: string; descripcion: string }[];
  nota: string;
};

export type Producto = {
  id: number;
  documentId: string;
  slug: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  categoria: string;
  precio: ProductoPrecio | null;
  colores: ProductoColor[];
  specs: ProductoSpec[];
  galeria: StrapiMedia[];
  features: ProductoFeature[];
  casosDeUso: ProductoCasoDeUso[];
  variantes: ProductoVariante[];
  reserva: ProductoReserva | null;
  cta: ProductoCta;
};

const BASE = "/productos/veltor-x1";

const media = (
  id: number,
  file: string,
  alternativeText: string,
): StrapiMedia => ({
  id,
  url: `${BASE}/${file}`,
  alternativeText,
  width: 1024,
  height: 768,
});

const veltorX1: Producto = {
  id: 1,
  documentId: "veltor-x1-0001",
  slug: "veltor-x1",
  nombre: "Veltor X1",
  tagline: "La mini-moto eléctrica hecha para la ciudad",
  descripcion:
    "El Veltor X1 combina el tamaño de un scooter con la postura de una moto deportiva. Motor de 1000W, freno de disco delantero y batería removible que cargas dentro de tu casa u oficina. Pensado para moverse todos los días en tráfico urbano, sin gasolina y sin mantenimiento complicado.",
  categoria: "Movilidad urbana",
  precio: { valor: 5490000, moneda: "COP", desde: true },

  colores: [
    {
      id: 1,
      nombre: "Negro grafito",
      slug: "negro",
      hex: "#1c1e24",
      hexSecundario: null,
      acento: "#d09828",
      acentoSuave: "#f5e9c4",
      imagen: media(11, "trasera-lineup.jpg", "Veltor X1 negro grafito"),
    },
    {
      id: 2,
      nombre: "Azul eléctrico",
      slug: "azul",
      hex: "#1d4ed8",
      hexSecundario: null,
      acento: "#3b82f6",
      acentoSuave: "#dbeafe",
      imagen: media(12, "trasera-blanco.jpg", "Veltor X1 azul eléctrico"),
    },
    {
      id: 3,
      nombre: "Rosa y azul",
      slug: "rosa-azul",
      hex: "#e11d6d",
      hexSecundario: "#22a7e0",
      acento: "#ec4899",
      acentoSuave: "#fce7f3",
      imagen: media(13, "frente-rosa-azul.jpg", "Veltor X1 bitono rosa y azul"),
    },
    {
      id: 4,
      nombre: "Blanco perla",
      slug: "blanco",
      hex: "#f0eae1",
      hexSecundario: null,
      acento: "#14b8a6",
      acentoSuave: "#ccfbf1",
      imagen: media(14, "frente-lineup.jpg", "Veltor X1 blanco perla"),
    },
  ],

  specs: [
    {
      id: 1,
      clave: "autonomia",
      etiqueta: "Autonomía",
      valor: 60,
      decimales: 0,
      unidad: "km",
      icono: "autonomia",
    },
    {
      id: 2,
      clave: "velocidad",
      etiqueta: "Velocidad máxima",
      valor: 45,
      decimales: 0,
      unidad: "km/h",
      icono: "velocidad",
    },
    {
      id: 3,
      clave: "motor",
      etiqueta: "Potencia del motor",
      valor: 1000,
      decimales: 0,
      unidad: "W",
      icono: "motor",
    },
    {
      id: 4,
      clave: "carga",
      etiqueta: "Tiempo de carga",
      valor: 6,
      decimales: 0,
      unidad: "h",
      icono: "carga",
    },
    {
      id: 5,
      clave: "peso",
      etiqueta: "Peso",
      valor: 68,
      decimales: 0,
      unidad: "kg",
      icono: "peso",
    },
    {
      id: 6,
      clave: "capacidad",
      etiqueta: "Capacidad de carga",
      valor: 150,
      decimales: 0,
      unidad: "kg",
      icono: "capacidad",
    },
  ],

  galeria: [
    media(21, "frente-rosa-azul.jpg", "Veltor X1 en tres cuartos frontal"),
    media(22, "frente-lineup.jpg", "Línea de Veltor X1 en sus cuatro colores"),
    media(23, "trasera-rosa-azul.jpg", "Veltor X1 en tres cuartos trasero"),
    media(24, "trasera-blanco.jpg", "Detalle del portaequipaje y sillín"),
    media(25, "trasera-lineup.jpg", "Vista trasera de la línea completa"),
  ],

  features: [
    {
      id: 1,
      titulo: "Freno de disco delantero",
      descripcion:
        "Frenado progresivo y estable incluso con piso mojado, con mordaza hidráulica de accionamiento suave.",
      icono: "freno",
    },
    {
      id: 2,
      titulo: "Suspensión trasera",
      descripcion:
        "Doble amortiguador regulable que absorbe huecos y reductores sin castigar la espalda.",
      icono: "suspension",
    },
    {
      id: 3,
      titulo: "Panel digital LED",
      descripcion:
        "Velocidad, nivel de batería, kilometraje y modo de conducción legibles bajo el sol.",
      icono: "tablero",
    },
    {
      id: 4,
      titulo: "Batería removible",
      descripcion:
        "Se extrae en segundos y se carga en cualquier toma común: no necesitas parqueadero con punto eléctrico.",
      icono: "bateria",
    },
    {
      id: 5,
      titulo: "Portaequipaje trasero",
      descripcion:
        "Parrilla reforzada compatible con baúl, ideal para domicilios y mercado del día.",
      icono: "portaequipaje",
    },
    {
      id: 6,
      titulo: "Iluminación LED completa",
      descripcion:
        "Farola, direccionales y stop en LED para ver y ser visto en tráfico nocturno.",
      icono: "luces",
    },
  ],

  casosDeUso: [
    {
      id: 1,
      titulo: "Ciudad",
      descripcion:
        "Tamaño compacto para filtrar tráfico y estacionar donde una moto grande no entra.",
      imagen: media(31, "frente-rosa-azul.jpg", "Veltor X1 listo para ciudad"),
    },
    {
      id: 2,
      titulo: "Delivery",
      descripcion:
        "Portaequipaje reforzado y costo por kilómetro cercano a cero para operaciones de reparto.",
      imagen: media(32, "trasera-blanco.jpg", "Veltor X1 configurado para reparto"),
    },
    {
      id: 3,
      titulo: "Jóvenes",
      descripcion:
        "Postura deportiva y cuatro colores para elegir, con un costo de entrada bajo.",
      imagen: media(33, "frente-lineup.jpg", "Colores disponibles del Veltor X1"),
    },
    {
      id: 4,
      titulo: "Movilidad diaria",
      descripcion:
        "60 km de autonomía cubren la semana de trabajo con una sola carga por noche.",
      imagen: media(34, "trasera-rosa-azul.jpg", "Veltor X1 para uso diario"),
    },
  ],

  variantes: [
    {
      id: 1,
      nombre: "X1 Lite",
      autonomiaKm: 45,
      velocidadKmh: 35,
      potenciaW: 800,
      precio: 4290000,
      destacada: false,
    },
    {
      id: 2,
      nombre: "X1",
      autonomiaKm: 60,
      velocidadKmh: 45,
      potenciaW: 1000,
      precio: 5490000,
      destacada: true,
    },
    {
      id: 3,
      nombre: "X1 Max",
      autonomiaKm: 85,
      velocidadKmh: 55,
      potenciaW: 1500,
      precio: 6890000,
      destacada: false,
    },
  ],

  reserva: {
    disponible: true,
    etiqueta: "Puedes reservar",
    deposito: 200000,
    vigenciaDias: 7,
    ciudades: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga"],
    horarios: ["9:00 a. m.", "11:00 a. m.", "2:00 p. m.", "4:00 p. m."],
    pasos: [
      {
        id: 1,
        titulo: "Elige color y versión",
        descripcion: "La unidad queda marcada con tu combinación.",
      },
      {
        id: 2,
        titulo: "Deja tus datos",
        descripcion: "Ciudad, fecha y horario para confirmarte en el día.",
      },
      {
        id: 3,
        titulo: "La separamos",
        descripcion: "Queda apartada 7 días con un abono reembolsable.",
      },
    ],
    nota: "El abono se descuenta del precio final. Si cancelas dentro de la vigencia, te lo devolvemos.",
  },

  cta: {
    principal: { etiqueta: "Reservar ahora", href: "#reservar" },
    secundario: { etiqueta: "Ver disponibilidad", href: "#reservar" },
    whatsapp: {
      etiqueta: "Reservar por WhatsApp",
      telefono: "573001112233",
      mensaje: "Hola, quiero reservar el Veltor X1.",
    },
  },
};

export const productos: Producto[] = [veltorX1];

export function getProductoBySlug(slug: string) {
  return productos.find((producto) => producto.slug === slug);
}

const formatoCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatPrecio(valor: number) {
  return formatoCOP.format(valor);
}

export function whatsappHref(whatsapp: ProductoCta["whatsapp"]) {
  return `https://wa.me/${whatsapp.telefono}?text=${encodeURIComponent(whatsapp.mensaje)}`;
}
