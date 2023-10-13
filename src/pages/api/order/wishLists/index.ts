import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { productId, userId } = req.body;
    const isVaild = productId && userId;
    if (!isVaild) return res.status(400).send("Bad Request");
    const existingProduct = await prisma.product.findFirst({
      where: { id: productId },
    });
    const existingUser = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!existingProduct && !existingUser)
      return res.status(404).send("Product or User not found");
    const wishList = await prisma.wishList.findFirst({
      where: { productId, userId },
    });
    if (wishList) return;
    const newWishList = await prisma.wishList.create({
      data: { productId, userId },
    });
    return res.status(200).send(newWishList);
  } else if (method === "DELETE") {
    const { productId, userId } = req.body;
    const isValid = productId && userId;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingProduct = await prisma.product.findFirst({
      where: { id: productId },
    });
    const existingUser = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!existingProduct && !existingUser)
      return res.status(404).send("Product or User not found");
    const wishList = await prisma.wishList.findFirst({
      where: { productId, userId },
    });
    if (!wishList) return;
    await prisma.wishList.delete({
      where: { id: wishList.id },
    });
    return res.status(200).send("Ok");
  }
  res.status(405).send("Method not allowed");
}
