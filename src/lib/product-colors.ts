export const productColors = [
  { name: "Azul", hex: "#2563eb" },
  { name: "Blanco", hex: "#f5f5f4" },
  { name: "Gris", hex: "#6b7280" },
  { name: "Negro", hex: "#171717" },
  { name: "Rosa/Azul", hex: "#ec4899" },
  { name: "Azul/Rosa", hex: "#38bdf8" },
  { name: "Rojo", hex: "#dc2626" },
  { name: "Morado", hex: "#a855f7" },
] as const;

export type ProductColorName = (typeof productColors)[number]["name"];

export function colorHex(name: string) {
  return productColors.find((color) => color.name === name)?.hex ?? "#6b7280";
}

export function colorSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
