'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado',
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            color: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return {
        ok: false,
        message: 'Orden no existe',
      };
    }

    const isAdmin = session.user.role === 'admin';
    const isOwner = session.user.id === order.userId;

    if (!isAdmin && !isOwner) {
      return {
        ok: false,
        message: 'Orden no existe',
      };
    }

    return {
      ok: true,
      order,
    };
  } catch {
    return {
      ok: false,
      message: 'Orden no existe',
    };
  }
};
