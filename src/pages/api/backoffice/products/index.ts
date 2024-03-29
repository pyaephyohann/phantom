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
      : "https://firebasestorage.googleapis.com/v0/b/phantom-4351b.appspot.com/o/___.jpeg?alt=media&token=ae091204-5e93-4289-a3f0-0993026021fd&_gl=1*w08hjc*_ga*Mzk0MzY0NjY1LjE2OTg0MTUzMjA.*_ga_CW55HF8NVT*MTY5ODQxNzYxNC4xMS4xLjE2OTg0MTgyNTQuMjguMC4w";
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
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingProduct = await prisma.product.findFirst({
      where: { id },
    });
    if (!existingProduct) return res.status(404).send("Product not found");
    await prisma.product.update({
      where: { id },
      data: { isArchived: true },
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
          data: { isArchived: true },
        })
      )
    );
    return res.status(200).send("Ok");
  }
  res.status(405).send("Method not allowed");
}
