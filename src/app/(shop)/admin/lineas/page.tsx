export const revalidate = 0;

import { Title } from "@/components";
import prisma from "@/lib/prisma";
import { LineasForm } from "./ui/LineasForm";

export default async function AdminLineasPage() {
  const categories = await prisma.category
    .findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { Product: true },
        },
      },
    })
    .catch(() => []);

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
          productCount: category._count.Product,
        }))}
      />
    </>
  );
}
