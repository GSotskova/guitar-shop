import {store} from '../store/index';
import {AuthorizationStatus} from '../constants';
import {ProductType} from './products';
import {UserType} from '../types/users';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authInfo: UserType | null;
  hasErrorLogin: boolean;
};

export type ProductData = {
  products: ProductType[];
  isProductsDataLoading: boolean;
  hasError: boolean;
};


export type SortProducts = {
  sortType: string;
  sortView: string;
};



export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
