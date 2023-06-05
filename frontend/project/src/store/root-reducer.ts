import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {productsData} from './products-data/products-data';
//import {sortProcess} from './sort-process/sort-process';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.DataProducts]: productsData.reducer,
  //[NameSpace.Sort]: sortProcess.reducer,
  [NameSpace.User]: userProcess.reducer
});
