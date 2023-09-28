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

export const store = configureStore({
  reducer: {
    backoffice: backofficeSlice,
    users: usersSlice,
    products: productsSlice,
    deletedProducts: deletedProductsSlice,
    categories: categoriesSlice,
    deletedCategories: deletedCategoriesSlice,
    productsCategories: productsCategoriesSlice,
    sizes: sizesSlice,
    colors: colorsSlice,
    genders: gendersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
