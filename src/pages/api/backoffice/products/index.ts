import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, price, imageUrl, categoryIds, sizeId, colorId, genderId } =
      req.body;
    const isValid = name && categoryIds.length && sizeId && colorId && genderId;
    if (!isValid) return res.status(400).send("Bad Request");
    const newProductPrice = price ? price : 0;
    const newProductImage = imageUrl
      ? imageUrl
      : "https://i.pinimg.com/236x/50/6e/dd/506eddb8f3d3e511c470f87d5880b6e3.jpg";
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: newProductPrice,
        imageUrl: newProductImage,
        sizeId,
        colorId,
        genderId,
      },
    });
    if (categoryIds.length > 1) {
      categoryIds.forEach(async (categoryId: number) => {
        await prisma.productCategory.create({
          data: {
            productId: newProduct.id,
            categoryId,
          },
        });
      });
    } else {
      await prisma.productCategory.create({
        data: {
          productId: newProduct.id,
          categoryId: categoryIds[0],
        },
      });
    }
    return res.status(200).send(newProduct);
  }
  res.status(405).send("Method not allowed");
}
