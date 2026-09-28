"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  linea?: string;
  includeInactive?: boolean;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadProducts(
  where: Prisma.ProductWhereInput,
  page: number,
  take: number,
) {
  const products = await prisma.product.findMany({
    take,
    skip: (page - 1) * take,
    include: {
      ProductImage: {
        take: 2,
        select: {
          url: true,
        },
      },
      category: {
        select: { name: true },
      },
    },
    where,
    orderBy: [{ title: "asc" }, { color: "asc" }],
  });

  const totalCount = await prisma.product.count({ where });

  return {
    currentPage: page,
    totalPages: Math.ceil(totalCount / take),
    products: products.map((product) => ({
      ...product,
      images: product.ProductImage.map((image) => image.url),
    })),
  };
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  linea,
  includeInactive = false,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const where: Prisma.ProductWhereInput = {
    ...(includeInactive ? {} : { isActive: true }),
    ...(linea
      ? { category: { name: { equals: linea, mode: "insensitive" as const } } }
      : {}),
  };

  try {
    return await loadProducts(where, page, take);
  } catch (error) {
    try {
      await wait(1500);
      return await loadProducts(where, page, take);
    } catch (retryError) {
      console.error("Error cargando productos:", retryError);
      throw new Error("No se pudo cargar los productos", { cause: retryError ?? error });
    }
  }
};
