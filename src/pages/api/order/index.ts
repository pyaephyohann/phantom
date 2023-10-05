import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
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
    return res.status(200).send({
      users,
      products,
      categories,
      productsCategories,
      sizes,
      colors,
      genders,
    });
  }
  res.status(405).send("Method not allowed");
}
