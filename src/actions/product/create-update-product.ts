"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { colorHex } from "@/lib/product-colors";

if (process.env.CLOUDINARY_URL) {
  cloudinary.config(process.env.CLOUDINARY_URL);
}

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  tags: z.string(),
  color: z.string().min(1),
  motorW: z.coerce.number().min(0).optional(),
  battery: z.string().optional(),
  maxSpeed: z.string().optional(),
  autonomy: z.string().optional(),
  isActive: z
    .union([z.literal("true"), z.literal("false"), z.boolean()])
    .optional()
    .transform((val) => val === true || val === "true"),
});

export const createUpdateProduct = async (formData: FormData) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return { ok: false, message: "No autorizado" };
  }

  const imageFiles = formData.getAll("images").filter(isUploadedFile);

  const data = Object.fromEntries(
    [...formData.entries()].filter(([key]) => key !== "images"),
  );
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.error("[product] validation", productParsed.error.flatten());
    return { ok: false, message: "Revisa título, slug, precio y línea" };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  let imageUrls: string[] = [];
  if (imageFiles.length > 0) {
    if (!process.env.CLOUDINARY_URL) {
      return {
        ok: false,
        message: "Falta CLOUDINARY_URL para subir las fotos",
      };
    }

    imageUrls = (await uploadImages(imageFiles)) ?? [];
    if (imageUrls.length !== imageFiles.length) {
      return { ok: false, message: "No se pudieron subir las fotos" };
    }
  }

  const tagsArray = rest.tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

  const payload = {
    title: rest.title,
    slug: rest.slug,
    description: rest.description,
    price: rest.price,
    inStock: rest.inStock,
    categoryId: rest.categoryId,
    color: rest.color,
    colorHex: colorHex(rest.color),
    motorW: rest.motorW || null,
    battery: rest.battery || null,
    maxSpeed: rest.maxSpeed || null,
    autonomy: rest.autonomy || null,
    isActive: rest.isActive ?? true,
  };

  try {
    const saved = id
      ? await prisma.product.update({
          where: { id },
          data: {
            ...payload,
            tags: { set: tagsArray },
          },
        })
      : await prisma.product.create({
          data: {
            ...payload,
            tags: tagsArray,
          },
        });

    if (imageUrls.length > 0) {
      await prisma.productImage.createMany({
        data: imageUrls.map((url) => ({
          url,
          productId: saved.id,
        })),
      });
    }

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);
    revalidatePath("/shop");
    revalidatePath("/");

    return {
      ok: true,
      product: saved,
    };
  } catch (error) {
    console.error("[product] save", error);

    if (isUniqueConstraint(error)) {
      return { ok: false, message: "Ya existe un producto con ese slug" };
    }

    return {
      ok: false,
      message: "No se pudo guardar el producto",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploaded = await Promise.all(
      images.map(async (image) => {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        const mime = image.type || "image/jpeg";

        const result = await cloudinary.uploader.upload(
          `data:${mime};base64,${base64Image}`,
          { folder: "veltor/products" },
        );

        return result.secure_url;
      }),
    );

    return uploaded.filter(Boolean);
  } catch (error) {
    console.error("[product] cloudinary", error);
    return null;
  }
};

function isUploadedFile(value: FormDataEntryValue): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    "size" in value &&
    (value as File).size > 0
  );
}

function isUniqueConstraint(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}
