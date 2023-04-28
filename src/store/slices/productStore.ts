import { IProduct, IProductStoreState } from "../../types/product.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IProductStoreState = {
  products: [],
  search: {
    searchName: "",
  },
};

const productStoreSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
  },
});

export const { actions, reducer } = productStoreSlice;
