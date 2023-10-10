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

interface OrderState {
  init: boolean;
  isLoading: boolean;
}

const initialState: OrderState = {
  init: false,
  isLoading: false,
};

export const fetchOrderAppData = createAsyncThunk(
  "order/fetchOrderApp",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(`${config.apiBaseUrl}/order`);
    const responseJson = await response.json();
    const {
      users,
      products,
      categories,
      productsCategories,
      sizes,
      colors,
      genders,
    } = responseJson;
    thunkAPI.dispatch(setUsers(users));
    thunkAPI.dispatch(setProducts(products));
    thunkAPI.dispatch(setCategories(categories));
    thunkAPI.dispatch(setProductsCategories(productsCategories));
    thunkAPI.dispatch(setSizes(sizes));
    thunkAPI.dispatch(setColors(colors));
    thunkAPI.dispatch(setGenders(genders));
    thunkAPI.dispatch(setInit(true));
    thunkAPI.dispatch(setIsLoading(false));
  }
);

export const selectOrderApp = (state: RootState) => state.order;
export const selectUsers = (state: RootState) => state.users.items;
export const selectProducts = (state: RootState) => state.products.items;
export const selectCategories = (state: RootState) => state.categories.items;
export const selectProductsCategories = (state: RootState) =>
  state.productsCategories.items;
export const selectSizes = (state: RootState) => state.sizes.items;
export const selectColors = (state: RootState) => state.colors.items;
export const selectGenders = (state: RootState) => state.genders.items;
export const selectCart = (state: RootState) => state.cart.items;

export const orderAppDatas = createSelector(
  [
    selectOrderApp,
    selectUsers,
    selectProducts,
    selectCategories,
    selectProductsCategories,
    selectSizes,
    selectColors,
    selectGenders,
    selectCart,
  ],
  (
    order,
    users,
    products,
    categories,
    productsCategories,
    sizes,
    colors,
    genders,
    cart
  ) => {
    return {
      isLoading: order.isLoading,
      users,
      products,
      categories,
      productsCategories,
      sizes,
      colors,
      genders,
      cart,
    };
  }
);

export const orderSlice = createSlice({
  name: "order",
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

export const { setInit, setIsLoading } = orderSlice.actions;

export default orderSlice.reducer;
