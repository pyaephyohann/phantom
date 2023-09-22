import { Category, ProductCategory } from "@prisma/client";

export const getCategoriesByProductId = (
  productId: string,
  categories: Category[],
  productsCategories: ProductCategory[]
) => {
  const categoryIds = productsCategories
    .filter((item) => item.productId === Number(productId))
    .map((item) => item.categoryId);
  return categories.filter((item) => categoryIds.includes(item.id));
};
