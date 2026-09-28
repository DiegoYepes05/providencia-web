"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { categorySlug } from "@/lib/category-slug";
import { revalidatePath } from "next/cache";

export const createCategory = async (name: string) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return { ok: false, message: "Debe de estar autenticado como admin" };
  }

  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { ok: false, message: "El nombre de la línea es muy corto" };
  }

  const slug = categorySlug(trimmed);
  if (!slug) {
    return { ok: false, message: "Usa un nombre con letras o números" };
  }

  const existing = await prisma.category.findMany({
    select: { name: true },
  });

  const taken = existing.some(
    (item) =>
      item.name.toLowerCase() === trimmed.toLowerCase() ||
      categorySlug(item.name) === slug,
  );

  if (taken) {
    return { ok: false, message: "Esa línea ya existe" };
  }

  try {
    await prisma.category.create({ data: { name: trimmed } });
    revalidatePath("/admin/lineas");
    revalidatePath("/shop");
    revalidatePath("/linea", "layout");
    return { ok: true };
  } catch {
    return { ok: false, message: "No se pudo crear la línea" };
  }
};
