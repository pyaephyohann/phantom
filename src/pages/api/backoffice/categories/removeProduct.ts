import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "DELETE") {
    const { categoryId, productId } = req.body;
    const isValid = categoryId && productId;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingCategory = await prisma.category.findFirst({
      where: { id: categoryId },
    });
    if (!existingCategory)
      return res.status(404).send("Category does not exist");
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
    if (!existingProduct) return res.status(404).send("Product does not exist");
    await prisma.productCategory.deleteMany({
      where: {
        productId,
        categoryId,
      },
    });
    return res.status(200).send("Ok");
  }
  res.status(405).send("Method not allowed");
}
