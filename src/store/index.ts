import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/usersSlice";
import productsSlice from "./slices/productsSlice";
import categoriesSlice from "./slices/categoriesSlice";
import productsCategoriesSlice from "./slices/productsCategoriesSlice";
import sizesSlice from "./slices/sizesSlice";
import colorsSlice from "./slices/colorsSlice";
import backofficeSlice from "./slices/backofficeSlice";
import gendersSlice from "./slices/gendersSlice";
import deletedProductsSlice from "./slices/deletedProductsSlice";
import deletedCategoriesSlice from "./slices/deletedCategoriesSlice";
import orderSlice from "./slices/orderSlice";
import filteredProductsSlice from "./slices/filteredProductsSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    backoffice: backofficeSlice,
    order: orderSlice,
    users: usersSlice,
    products: productsSlice,
    deletedProducts: deletedProductsSlice,
    categories: categoriesSlice,
    deletedCategories: deletedCategoriesSlice,
    productsCategories: productsCategoriesSlice,
    sizes: sizesSlice,
    colors: colorsSlice,
    genders: gendersSlice,
    filteredProducts: filteredProductsSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
