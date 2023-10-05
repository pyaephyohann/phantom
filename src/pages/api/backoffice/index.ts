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

  const users = await prisma.user.findMany({ where: { isArchived: false } });

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

    const defaultGenderDatas = [
      { name: "Male" },
      { name: "Female" },
      { name: "Other" },
    ];

    await prisma.gender.createMany({
      data: defaultGenderDatas,
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

  const products = await prisma.product.findMany({
    where: { isArchived: false },
  });
  const deletedProducts = await prisma.product.findMany({
    where: { isArchived: true },
  });
  const categories = await prisma.category.findMany({
    where: { isArchived: false },
  });
  const deletedCategories = await prisma.category.findMany({
    where: { isArchived: true },
  });
  const productsCategories = await prisma.productCategory.findMany({
    where: { isArchived: false },
  });
  const sizes = await prisma.size.findMany();
  const colors = await prisma.color.findMany();
  const genders = await prisma.gender.findMany();

  res.status(200).json({
    users,
    products,
    deletedProducts,
    categories,
    deletedCategories,
    productsCategories,
    sizes,
    colors,
    genders,
  });
}
