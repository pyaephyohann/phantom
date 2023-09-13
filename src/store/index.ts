import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/usersSlice";
import productsSlice from "./slices/productsSlice";
import categoriesSlice from "./slices/categoriesSlice";
import productsCategoriesSlice from "./slices/productsCategoriesSlice";
import sizesSlice from "./slices/sizesSlice";
import colorsSlice from "./slices/colorsSlice";
import backofficeSlice from "./slices/backofficeSlice";

export const store = configureStore({
  reducer: {
    backoffice: backofficeSlice,
    users: usersSlice,
    products: productsSlice,
    categories: categoriesSlice,
    productsCategories: productsCategoriesSlice,
    sizes: sizesSlice,
    colors: colorsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
