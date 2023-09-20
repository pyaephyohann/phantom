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
  } else if (method === "PUT") {
    const { productToUpdate, categoryIds, updatedImageUrl } = req.body;
    const { id, name, price, sizeId, colorId, genderId } = productToUpdate;
    const isValid = id && sizeId && colorId && genderId;
    if (!isValid) return res.status(400).send("Bad Request");
    const updatedPrice = price ? price : 0;
    const existingProduct = await prisma.product.findFirst({
      where: { id },
    });
    if (!existingProduct) return res.status(400).send("Bad Request");
    let updatedProduct = {};
    if (name) {
      updatedProduct = await prisma.product.update({
        where: { id },
        data: { name },
      });
    }
    if (updatedPrice) {
      updatedProduct = await prisma.product.update({
        where: { id },
        data: { price: updatedPrice },
      });
    }
    updatedProduct = await prisma.product.update({
      where: { id },
      data: { sizeId, colorId, genderId },
    });
    if (updatedImageUrl) {
      updatedProduct = await prisma.product.update({
        where: { id },
        data: { imageUrl: updatedImageUrl },
      });
    }
    if (categoryIds.length) {
      const existingProductsCategories = await prisma.productCategory.findMany({
        where: { productId: id },
      });
      const existingCategoryIds = existingProductsCategories.map(
        (item) => item.categoryId
      );
      // db [1,2] --> paylod [1]
      const removedCategoryIds = existingCategoryIds.filter(
        (id) => !categoryIds.includes(id)
      );
      if (removedCategoryIds.length) {
        await prisma.productCategory.deleteMany({
          where: {
            productId: id,
            categoryId: {
              in: removedCategoryIds,
            },
          },
        });
      }
      // db [1,2] --> payload [1,2,3]
      const addedCategoryIds = categoryIds.filter(
        (id: number) => !existingCategoryIds.includes(id)
      );
      if (addedCategoryIds.length) {
        const newProductsCategories = addedCategoryIds.map(
          (categoryId: number) => ({ productId: id, categoryId })
        );
        await prisma.productCategory.createMany({
          data: newProductsCategories,
        });
      }
    }
    return res.status(200).send(updatedProduct);
  }
  res.status(405).send("Method not allowed");
}
