import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../constants';
import {UserProcess} from '../../types/state';
import {fetchUserStatus, loginUser, logoutUser} from '../api-actions';
import { UserType } from '../../types/users';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
  hasErrorLogin: false
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    loadAuthInfo: (state, action: PayloadAction<{authInfo: UserType}>) => {
      state.authInfo = action.payload.authInfo;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authInfo = action.payload;
      })
      .addCase(fetchUserStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.hasErrorLogin = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.hasErrorLogin = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.hasErrorLogin = false;
      });
  }
});
export const {loadAuthInfo} = userProcess.actions;
