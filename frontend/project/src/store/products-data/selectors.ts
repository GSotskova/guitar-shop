import {NameSpace} from '../../constants';
import {State} from '../../types/state';
import {ProductType} from '../../types/products';


export const getProducts = (state: State): ProductType[] => state[NameSpace.DataProducts].products;
export const getProductsDataLoadingStatus = (state: State): boolean => state[NameSpace.DataProducts].isProductsDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.DataProducts].hasError;

