"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleProductActive = async (id: string, isActive: boolean) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { ok: false, message: "No autorizado" };
  }

  try {
    const product = await prisma.product.update({
      where: { id },
      data: { isActive },
      select: { slug: true, isActive: true },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);
    revalidatePath("/shop");
    revalidatePath("/");

    return { ok: true, isActive: product.isActive };
  } catch {
    return { ok: false, message: "No se pudo actualizar el producto" };
  }
};
