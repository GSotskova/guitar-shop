import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {ProductData} from '../../types/state';
import {fetchProducts} from '../api-actions';

const initialState: ProductData = {
  products: [],
  isProductsDataLoading: false,
  hasError: false,
};


export const productsData = createSlice({
  name: NameSpace.DataProducts,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isProductsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('ff', state, action.payload)
        state.products = action.payload;
        state.isProductsDataLoading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isProductsDataLoading = false;
        state.hasError = true;
      });
  }
});

