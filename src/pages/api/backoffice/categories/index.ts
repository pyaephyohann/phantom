import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name } = req.body;
    const isValid = name;
    if (!isValid) return res.status(400).send("Bad Request");
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    return res.status(200).send(newCategory);
  } else if (method === "PUT") {
    const { id, name } = req.body;
    const isValid = id && name;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingCategory = await prisma.category.findFirst({
      where: { id },
    });
    if (!existingCategory) return res.status(400).send("Bad Request");
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });
    return res.status(200).send(updatedCategory);
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isVaild = id;
    if (!isVaild) return res.status(400).send("Bad Request");
    const existingCategory = await prisma.category.findFirst({
      where: { id },
    });
    if (!existingCategory)
      return res.status(404).send("Category does not exist");
    await prisma.category.update({
      where: { id },
      data: { isArchived: true },
    });
    const productsCategoriesByCategoryId =
      await prisma.productCategory.findMany({
        where: {
          categoryId: id,
        },
      });
    await prisma.$transaction(
      productsCategoriesByCategoryId.map((item) =>
        prisma.productCategory.update({
          where: { id: item.id },
          data: { isArchived: true },
        })
      )
    );
    return res.status(200).send("Ok");
  }
  res.status(405).send("Method not allowed");
}
