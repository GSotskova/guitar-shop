import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {ProductData} from '../../types/state';
import {editProduct, fetchProduct, fetchProducts, postProduct} from '../api-actions';

const initialState: ProductData = {
  products: [],
  isProductsDataLoading: false,
  hasError: false,
  isProductLoading: false,
  product: null,
  hasErrorPost: false
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
        state.products = action.payload;
        state.isProductsDataLoading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isProductsDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isProductLoading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isProductLoading = false;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.hasErrorPost = false;
      })
      .addCase(postProduct.rejected, (state) => {
        state.hasErrorPost = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        state.products = state.products.map((product) => product.id === updatedProduct.id ? updatedProduct : product);

      });
  }
});

