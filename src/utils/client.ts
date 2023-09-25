import { Category, Product, ProductCategory } from "@prisma/client";

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

export const getProductsByCategoryId = (
  categoryId: number,
  products: Product[],
  productsCategories: ProductCategory[]
) => {
  const productIds = productsCategories
    .filter((item) => item.categoryId === categoryId)
    .map((item) => item.productId);
  return products.filter((item) => productIds.includes(item.id));
};
