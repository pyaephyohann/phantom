import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const user = session?.user ? session.user : undefined;
  const name = user?.name as string;
  const email = user?.email as string;
  const image = user?.image as string;

  if (user) {
    const userFromDB = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userFromDB) {
      await prisma.user.create({
        data: {
          name,
          email,
          imageUrl: image,
        },
      });
    }
  }

  const users = await prisma.user.findMany();
  const products = await prisma.product.findMany({
    where: { isArchived: false },
  });
  const categories = await prisma.category.findMany({
    where: { isArchived: false },
  });
  const productsCategories = await prisma.productCategory.findMany({
    where: { isArchived: false },
  });
  const sizes = await prisma.size.findMany();
  const colors = await prisma.color.findMany();
  const genders = await prisma.gender.findMany();
  const orders = user ? await prisma.order.findMany() : [];
  const orderlines = user ? await prisma.orderline.findMany() : [];
  const wishLists = user ? await prisma.wishList.findMany() : [];
  return res.status(200).send({
    users,
    products,
    categories,
    productsCategories,
    sizes,
    colors,
    genders,
    orders,
    orderlines,
    wishLists,
  });
}
