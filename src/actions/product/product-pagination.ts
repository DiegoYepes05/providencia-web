"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  linea?: string;
  includeInactive?: boolean;
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
    const products = await prisma.product.findMany({
      take: take,
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
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch {
    throw new Error("No se pudo cargar los productos");
  }
};
