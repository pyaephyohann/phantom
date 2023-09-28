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
    const existingCategory = await prisma.category.findFirst({
      where: { id },
    });
    if (!existingCategory)
      return res.status(404).send("Category does not exist");
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { isArchived: false },
    });
    return res.status(200).send(updatedCategory);
  }
  res.status(405).send("Method not allowed");
}
