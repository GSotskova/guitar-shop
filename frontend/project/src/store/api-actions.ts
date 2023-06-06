import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute, HttpCode } from '../constants';
import {saveToken, dropToken} from '../services/token';
import {
  adaptProductsToClient,
  adaptProductToClient,
  adaptUserToClient
} from '../utils/adapters/adaptersToClient';
import {
  adaptEditProductToServer,
  adaptCreateProductToServer,
  adaptUserToServer,
  adaptPhotoToServer
} from '../utils/adapters/adaptersToServer';

import ProductDto from '../dto/product/product.dto';
import UserDto from '../dto/user/user.dto';
import { ProductNew, ProductType } from '../types/products';
import { UserAuth, UserRegister, UserType } from '../types/users';
import {AppDispatch, State} from '../types/state.js';
import { redirectToRoute } from './action';
import {loadAuthInfo} from '../store/user-process/user-process';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  FETCH_PRODUCTS: 'products',
  FETCH_PRODUCT: 'product/fetch',
  POST_OFFER: 'offer/post-offer',
  EDIT_OFFER: 'offer/edit-offer',
  DELETE_OFFER: 'offer/delete-offer',
  POST_PRODUCT: 'product/post-product',
  EDIT_PRODUCT: 'product/edit-product',
  DELETE_PRODUCT: 'product/delete-product',
  DELETE_FAVORITE: 'product/delete-favorite',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register',
};

export const fetchProducts = createAsyncThunk<ProductType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
  Action.FETCH_PRODUCTS,
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<ProductDto[]>(AppRoute.Products);
    return adaptProductsToClient(data);
  });



export const fetchProduct = createAsyncThunk<ProductType, ProductType['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
  Action.FETCH_PRODUCT,
  async (id, {dispatch, extra: api}) => {

    try {
      const { data } = await api.get<ProductDto>(`${APIRoute.Products}/${id}`);
      return adaptProductToClient(data);
    } catch (error) {

      return Promise.reject(error);
    }
  });

  export const postProduct = createAsyncThunk<ProductType, ProductNew, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
    Action.POST_OFFER,
    async (newProduct, { dispatch, extra: api }) => {
      console.log('postProduct', newProduct, adaptCreateProductToServer(newProduct))
      const { data } = await api.post<ProductDto>(`${APIRoute.Products}/create`, adaptCreateProductToServer(newProduct));
      dispatch(redirectToRoute(`${AppRoute.Products}/${data.id}`));

      if (data) {

        const postImageApiRoute = `${APIRoute.Products}/${data.id}/photo`;
        await api.post(postImageApiRoute, adaptPhotoToServer(newProduct.photo), {
          headers: { 'Content-Type': 'multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
        });

      }

      return adaptProductToClient(data);
    });

export const editProduct = createAsyncThunk<ProductType, ProductType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }>(
  Action.EDIT_PRODUCT,
  async (product, { dispatch, extra: api }) => {

    const postImageAPIRoute = `${APIRoute.Products}/${product.id}/photo`;
    await api.post(postImageAPIRoute, adaptPhotoToServer(product.photo), {
      headers: { 'Content-Type': 'multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
    });


    const { data } = await api.patch<ProductDto>(`${APIRoute.Products}/${product.id}${APIRoute.Edit}`, adaptEditProductToServer(product));

    dispatch(redirectToRoute(`${AppRoute.Products}/${data.id}`));
    return adaptProductToClient(data);
  });

export const deleteProduct = createAsyncThunk<ProductType[], string, { dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }>(
  Action.DELETE_PRODUCT,
  async (id, { dispatch, extra: api  }) => {
    await api.delete(`${APIRoute.Products}/${id}${APIRoute.Delete}`);


    const { data } = await api.get<ProductDto[]>(AppRoute.Products);
    adaptProductsToClient(data);
    dispatch(redirectToRoute(`${AppRoute.Products}`));
    return data
  });



export const fetchUserStatus = createAsyncThunk<UserType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance; }>(
  Action.FETCH_USER_STATUS,
  async (_arg, {dispatch, extra: api}) => {

    try {
      const { data } = await api.get<UserDto>(APIRoute.Login);
      return adaptUserToClient(data);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.UNAUTHORIZED) {
        dropToken();
      }

      return Promise.reject(error);
    }
  });

export const loginUser = createAsyncThunk<UserType, UserAuth, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }>(
  Action.LOGIN_USER,
  async ({ email, password }, {dispatch, extra: api}) => {
    const { data: {token} } = await api.post<UserType & { token: string }>(APIRoute.Login, { email, password });
    saveToken(token);
    const {data} = await api.get<UserType>(APIRoute.Login);
    dispatch(loadAuthInfo({authInfo: data}));
    dispatch(redirectToRoute(AppRoute.Products));
    return data;
  });

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, { extra }) => {
    const { api } = extra;
    await api.delete(APIRoute.Logout);

    dropToken();
  });

export const registerUser = createAsyncThunk<void, UserRegister, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }>(
  Action.REGISTER_USER,
  async ({ email, password, name }, { dispatch, extra: api }) => {
    const { data } = await api.post<{ id: string }>(APIRoute.Register, adaptUserToServer({
      email,
      password,
      name
    }));
    dispatch(redirectToRoute(AppRoute.Login));
  });


