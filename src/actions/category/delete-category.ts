"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (id: string) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return { ok: false, message: "Debe de estar autenticado como admin" };
  }

  const products = await prisma.product.count({ where: { categoryId: id } });
  if (products > 0) {
    return {
      ok: false,
      message: "Mueve o elimina los productos de esta línea antes de borrarla",
    };
  }

  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/lineas");
    revalidatePath("/shop");
    revalidatePath("/linea", "layout");
    return { ok: true };
  } catch {
    return { ok: false, message: "No se pudo eliminar la línea" };
  }
};
