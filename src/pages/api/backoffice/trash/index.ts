import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const products = await prisma.product.findMany({
      where: { isArchived: true },
    });
    const categories = await prisma.category.findMany({
      where: { isArchived: true },
    });
    return res.status(200).send({ products, categories });
  }
  res.status(405).send("Method not allowed");
}
