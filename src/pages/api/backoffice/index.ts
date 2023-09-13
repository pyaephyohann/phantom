import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(401).send("Unauthorized");
  const user = session.user;
  const name = user?.name as string;
  const email = user?.email as string;
  const image = user?.image as string;

  const users = await prisma.user.findMany();

  if (!users.length) {
    const defaultSizeDatas = [
      { name: "small" },
      { name: "medium" },
      { name: "large" },
      { name: "xl" },
      { name: "xxl" },
    ];
    await prisma.size.createMany({
      data: defaultSizeDatas,
    });
  }

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

  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();
  const productsCategories = await prisma.productCategory.findMany();
  const sizes = await prisma.size.findMany();
  const colors = await prisma.color.findMany();

  res.status(200).json({
    users,
    products,
    categories,
    productsCategories,
    sizes,
    colors,
  });
}
