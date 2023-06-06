import {NameSpace, AuthorizationStatus} from '../../constants';
import {State} from '../../types/state';
import { UserType} from '../../types/users';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getAuthInfo = (state: State): UserType | null => state[NameSpace.User].authInfo;
export const getHasErrorLogin = (state: State): boolean => state[NameSpace.User].hasErrorLogin;
