import bcryptjs from "bcryptjs";
import { colorHex, colorSlug } from "../lib/product-colors";

interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  slug: string;
  tags: string[];
  title: string;
  linea: "nova" | "confort" | "carguero";
  color: string;
  colorHex: string;
  motorW: number;
  battery: string;
  maxSpeed: string;
  autonomy: string;
}

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

interface SeedData {
  users: SeedUser[];
  categories: string[];
  products: SeedProduct[];
}

const vehicle = (
  title: string,
  linea: SeedProduct["linea"],
  color: string,
  price: number,
  image: string,
  description: string,
  extras: {
    motorW: number;
    battery: string;
    maxSpeed: string;
    autonomy: string;
    tags: string[];
  },
): SeedProduct => ({
  title,
  linea,
  color,
  colorHex: colorHex(color),
  price,
  inStock: 1,
  slug: `${title.toLowerCase().replace(/ /g, "-")}-${colorSlug(color)}`,
  images: [image],
  description,
  ...extras,
});

export const initialData: SeedData = {
  users: [
    {
      email: "fernando@google.com",
      name: "Fernando Herrera",
      password: bcryptjs.hashSync("123456"),
      role: "admin",
    },
    {
      email: "melissa@google.com",
      name: "Melissa Flores",
      password: bcryptjs.hashSync("123456"),
      role: "user",
    },
  ],

  categories: ["Nova", "Confort", "Carguero"],

  products: [
    ...(["Azul", "Blanco", "Gris", "Negro", "Rosa/Azul"] as const).map((color) =>
      vehicle(
        "Nova 800",
        "nova",
        color,
        3900000,
        `/products/veltor/nova/nova-800-${colorSlug(color)}.jpg`,
        "La Veltor Nova 800 es una motocicleta eléctrica urbana de 800 W diseñada para desplazamientos cotidianos, combinando autonomía, velocidad moderada, bajo consumo y un diseño moderno y robusto.",
        {
          motorW: 800,
          battery: "60V 20Ah Litio",
          maxSpeed: "50-55 km/h",
          autonomy: "50-60 km",
          tags: ["tablero digital", "luces led", "alarma remota", "freno de disco"],
        },
      ),
    ),
    ...(["Azul/Rosa", "Blanco", "Gris", "Negro"] as const).map((color) =>
      vehicle(
        "Nova Pro 800",
        "nova",
        color,
        4200000,
        `/products/veltor/nova/nova-pro-800-${colorSlug(color)}.jpg`,
        "La Veltor Nova Pro 800 es una motocicleta eléctrica urbana de 800 W, orientada a ofrecer una movilidad práctica, con equipamiento adicional, diseño deportivo y características de confort y seguridad para el uso diario.",
        {
          motorW: 800,
          battery: "60V 20Ah Litio",
          maxSpeed: "50-55 km/h",
          autonomy: "50-60 km",
          tags: ["bluetooth", "espejos", "direccionales", "alarma remota"],
        },
      ),
    ),
    vehicle(
      "Confort 800",
      "confort",
      "Rojo",
      6800000,
      "/products/veltor/confort/confort-800-rojo.jpg",
      "Vehículo eléctrico de tres ruedas tipo scooter/cabina, pensado principalmente para comodidad, estabilidad y desplazamientos cortos. Incluye techo y parabrisas.",
      {
        motorW: 800,
        battery: "60V 20Ah Litio",
        maxSpeed: "35 km/h",
        autonomy: "50-60 km",
        tags: ["cabina", "pantalla lcd", "alarma", "iluminación led"],
      },
    ),
    vehicle(
      "Confort Plus 800",
      "confort",
      "Morado",
      7100000,
      "/products/veltor/confort/confort-plus-800-morado.jpg",
      "VELTOR Confort Plus 800 es un vehículo eléctrico de tres ruedas orientado a la movilidad urbana, ofreciendo comodidad, protección y facilidad de conducción. Su diseño cerrado lo hace apropiado para desplazamientos cotidianos, compras, recorridos cortos y transporte de familias o personas mayores.",
      {
        motorW: 800,
        battery: "60V 20Ah Litio",
        maxSpeed: "35 km/h",
        autonomy: "50-60 km",
        tags: ["cabina cerrada", "bluetooth", "dos controles", "reversa"],
      },
    ),
    vehicle(
      "Carguero Plus 800",
      "carguero",
      "Azul",
      6800000,
      "/products/veltor/carguero/carguero-plus-800-azul.jpg",
      "VELTOR Carguero Plus 800 — Potencia eléctrica para el trabajo diario. Con capacidad de carga de hasta 500 kg, motor de 800 W, batería de litio y autonomía de 50-60 km, es una solución práctica, resistente y económica para transporte y reparto.",
      {
        motorW: 800,
        battery: "60V 20Ah Litio",
        maxSpeed: "35 km/h",
        autonomy: "50-60 km",
        tags: ["carga 500 kg", "plataforma", "marcha atrás", "trabajo"],
      },
    ),
  ],
};
