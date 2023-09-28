import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingProduct = await prisma.product.findFirst({ where: { id } });
    if (!existingProduct) return res.status(404).send("Product does not exist");
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { isArchived: false },
    });
    const productsCategoriesByProductId = await prisma.productCategory.findMany(
      {
        where: {
          productId: id,
        },
      }
    );
    await prisma.$transaction(
      productsCategoriesByProductId.map((item) =>
        prisma.productCategory.update({
          where: { id: item.id },
          data: { isArchived: false },
        })
      )
    );
    return res.status(200).send(updatedProduct);
  }
  res.status(200).json({ name: "John Doe" });
}
