"use server";

import prisma from "@/lib/prisma";
import { currencyFormat } from "@/utils";
import { productImageSrc } from "@/utils/product-image-src";
import { lineup } from "@/content/landing";

export type LandingCatalogItem = (typeof lineup.items)[number];

const snippet = (text: string) => {
  const sentence = text.split(/(?<=\.)\s/)[0] ?? text;
  return sentence.length > 160 ? `${sentence.slice(0, 157)}…` : sentence;
};

export const getLandingCatalog = async (): Promise<LandingCatalogItem[]> => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        ProductImage: {
          take: 1,
          select: { url: true },
        },
        category: {
          select: { name: true },
        },
      },
      orderBy: [{ title: "asc" }, { price: "asc" }],
    });

    const byTitle = new Map<string, (typeof products)[number]>();

    for (const product of products) {
      const isCatalog = /nova|confort|carguero/i.test(product.title);
      if (!isCatalog) continue;
      if (!byTitle.has(product.title)) {
        byTitle.set(product.title, product);
      }
    }

    const items = [...byTitle.values()].map((product) => ({
      slug: product.slug,
      name: product.title,
      price: `Desde ${currencyFormat(product.price)}`,
      description: snippet(product.description),
      image: {
        src: productImageSrc(product.ProductImage[0]?.url),
        alt: `${product.title} ${product.color}`,
      },
      specs: [
        {
          value: product.motorW ? `${product.motorW} W` : "—",
          label: "Potencia",
        },
        {
          value: product.maxSpeed || "—",
          label: "Velocidad",
        },
        {
          value: product.autonomy || "—",
          label: "Autonomía",
        },
      ],
    }));

    return items.length > 0 ? items : lineup.items;
  } catch {
    return lineup.items;
  }
};
