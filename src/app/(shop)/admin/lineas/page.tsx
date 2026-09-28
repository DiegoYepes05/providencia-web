export const revalidate = 0;

import { getCategories } from "@/actions";
import { Title } from "@/components";
import prisma from "@/lib/prisma";
import { LineasForm } from "./ui/LineasForm";

export default async function AdminLineasPage() {
  const categories = await getCategories();
  let counts: { categoryId: string; _count: { categoryId: number } }[] = [];
  try {
    counts = await prisma.product.groupBy({
      by: ["categoryId"],
      _count: { categoryId: true },
    });
  } catch {
    counts = [];
  }

  const countById = Object.fromEntries(
    counts.map((item) => [item.categoryId, item._count.categoryId]),
  );

  return (
    <>
      <Title title="Líneas" subtitle="Administración" />
      <p className="mb-8 max-w-xl text-sm leading-6 text-white/50">
        Las líneas aparecen arriba del catálogo. Créalas aquí y asígnalas al
        editar un producto. No hace falta el seed.
      </p>
      <LineasForm
        lineas={categories.map((category) => ({
          id: category.id,
          name: category.name,
          productCount: countById[category.id] ?? 0,
        }))}
      />
    </>
  );
}
