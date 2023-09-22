import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { id, discountPrice } = req.body;
    const isValid = id && discountPrice;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingProduct = await prisma.product.findFirst({ where: { id } });
    if (!existingProduct) return res.status(404).send("Product not found");
    const discountedProduct = await prisma.product.update({
      where: { id },
      data: { discountPrice },
    });
    return res.status(200).send(discountedProduct);
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingProduct = await prisma.product.findFirst({ where: { id } });
    if (!existingProduct) return res.status(404).send("Product not found");
    const discountRemovedProduct = await prisma.product.update({
      where: { id },
      data: { discountPrice: 0 },
    });
    return res.status(200).send(discountRemovedProduct);
  }
  res.status(405).send("Method not allowed");
}
