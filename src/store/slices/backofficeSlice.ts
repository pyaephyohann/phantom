import { config } from "@/config";
import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { setUsers } from "./usersSlice";
import { setProducts } from "./productsSlice";
import { setCategories } from "./categoriesSlice";
import { setProductsCategories } from "./productsCategoriesSlice";
import { setSizes } from "./sizesSlice";
import { setColors } from "./colorsSlice";
import { RootState } from "..";
import { setGenders } from "./gendersSlice";
import { setDeletedProducts } from "./deletedProductsSlice";
import { setDeletedCategories } from "./deletedCategoriesSlice";
import { setOrders } from "./ordersSlice";
import { setOrderlines } from "./orderlinesSlice";

interface BackofficeState {
  init: boolean;
  isLoading: boolean;
}

const initialState: BackofficeState = {
  init: false,
  isLoading: false,
};

export const fetchBackofficeData = createAsyncThunk(
  "backoffice/fetchBackofficeData",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(`${config.apiBaseUrl}/backoffice`);
    const responseJson = await response.json();
    const {
      users,
      products,
      deletedProducts,
      categories,
      deletedCategories,
      productsCategories,
      sizes,
      colors,
      genders,
      orders,
      orderlines,
    } = responseJson;
    thunkAPI.dispatch(setUsers(users));
    thunkAPI.dispatch(setProducts(products));
    thunkAPI.dispatch(setDeletedProducts(deletedProducts));
    thunkAPI.dispatch(setCategories(categories));
    thunkAPI.dispatch(setDeletedCategories(deletedCategories));
    thunkAPI.dispatch(setProductsCategories(productsCategories));
    thunkAPI.dispatch(setSizes(sizes));
    thunkAPI.dispatch(setColors(colors));
    thunkAPI.dispatch(setGenders(genders));
    thunkAPI.dispatch(setOrders(orders));
    thunkAPI.dispatch(setOrderlines(orderlines));
    thunkAPI.dispatch(setInit(true));
    thunkAPI.dispatch(setIsLoading(false));
  }
);

export const selectBackoffice = (state: RootState) => state.backoffice;
export const selectUsers = (state: RootState) => state.users.items;
export const selectProducts = (state: RootState) => state.products.items;
export const selectDeletedProducts = (state: RootState) =>
  state.deletedProducts.items;
export const selectCategories = (state: RootState) => state.categories.items;
export const selectDeletedCategories = (state: RootState) =>
  state.deletedCategories.items;
export const selectProductsCategories = (state: RootState) =>
  state.productsCategories.items;
export const selectSizes = (state: RootState) => state.sizes.items;
export const selectColors = (state: RootState) => state.colors.items;
export const selectGenders = (state: RootState) => state.genders.items;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrderlines = (state: RootState) => state.orderlines.items;

export const backofficeAppDatas = createSelector(
  [
    selectBackoffice,
    selectUsers,
    selectProducts,
    selectDeletedProducts,
    selectCategories,
    selectDeletedCategories,
    selectProductsCategories,
    selectSizes,
    selectColors,
    selectGenders,
    selectOrders,
    selectOrderlines,
  ],
  (
    backoffice,
    users,
    products,
    deletedProducts,
    categories,
    deletedCategories,
    productsCategories,
    sizes,
    colors,
    genders,
    orders,
    orderlines
  ) => {
    return {
      isLoading: backoffice.isLoading,
      users,
      products,
      deletedProducts,
      categories,
      deletedCategories,
      productsCategories,
      sizes,
      colors,
      genders,
      orders,
      orderlines,
    };
  }
);

export const backofficeSlice = createSlice({
  name: "backoffice",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setInit, setIsLoading } = backofficeSlice.actions;

export default backofficeSlice.reducer;
