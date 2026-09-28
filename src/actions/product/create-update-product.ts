'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Product } from '@prisma/client';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
import { colorHex } from '@/lib/product-colors';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

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
    .union([z.literal('true'), z.literal('false'), z.boolean()])
    .optional()
    .transform((val) => val === true || val === 'true'),
});

export const createUpdateProduct = async (formData: FormData) => {
  const session = await auth();
  if (session?.user.role !== 'admin') {
    return { ok: false, message: 'No autorizado' };
  }

  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return { ok: false };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async () => {
      let product: Product;
      const tagsArray = rest.tags
        .split(',')
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

      if (id) {
        product = await prisma.product.update({
          where: { id },
          data: {
            ...payload,
            tags: { set: tagsArray },
          },
        });
      } else {
        product = await prisma.product.create({
          data: {
            ...payload,
            tags: tagsArray,
          },
        });
      }

      if (formData.getAll('images').length > 0) {
        const images = await uploadImages(formData.getAll('images') as File[]);
        if (!images) {
          throw new Error('No se pudo cargar las imágenes, rollingback');
        }

        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return { product };
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);
    revalidatePath('/shop');
    revalidatePath('/');

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch {
    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar/crear',
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch {
        return null;
      }
    });

    return Promise.all(uploadPromises);
  } catch {
    return null;
  }
};
