import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import {redirect} from './middlewares/redirect';
import {rootReducer} from './root-reducer';
import { fetchProducts, fetchUserStatus } from './api-actions';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(fetchUserStatus());
store.dispatch(fetchProducts());

export default store;
