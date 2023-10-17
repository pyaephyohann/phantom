import { CartItem } from "@/store/slices/cartSlice";
import { Category, Orderline, Product, ProductCategory } from "@prisma/client";

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

export const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

export const getCartTotalPrice = (cart: CartItem[]) => {
  const totalPrice = cart.reduce((prev, curr) => {
    if (curr.product.discountPrice) {
      return (prev += curr.product.discountPrice * curr.quantity);
    } else {
      return (prev += curr.product.price * curr.quantity);
    }
  }, 0);
  return totalPrice;
};

export const getOrderlinesByOrderId = (
  orderId: number,
  orderlines: Orderline[]
) => {
  return orderlines.filter((item) => item.orderId === orderId);
};

export const getOrderlineStatus = (
  orderId: number,
  orderlines: Orderline[]
) => {
  const validOrderlines = getOrderlinesByOrderId(orderId, orderlines);
  return validOrderlines.map((item) => item.status);
};
