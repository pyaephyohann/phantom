import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { categoryId, productIds } = req.body;
    const isValid = categoryId && productIds.length;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingCategory = await prisma.category.findFirst({
      where: { id: categoryId },
    });
    const existingProducts = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });
    if (!existingCategory && !existingProducts.length)
      return res.status(400).send("Bad Request");
    await prisma.$transaction(
      productIds.map((productId: number) =>
        prisma.productCategory.create({
          data: {
            categoryId,
            productId,
          },
        })
      )
    );
    return res.status(200).send("Ok");
  }
  res.status(405).send("Method not allowed");
}
