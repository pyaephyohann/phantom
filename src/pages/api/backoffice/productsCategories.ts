import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const productsCategories = await prisma.productCategory.findMany({
      where: {
        isArchived: false,
      },
    });
    return res.status(200).send(productsCategories);
  }
  res.status(405).send("Method not allowed");
}
