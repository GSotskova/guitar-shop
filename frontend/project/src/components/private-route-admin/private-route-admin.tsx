import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getAuthInfo, getAuthorizationStatus } from '../../store/user-process/selectors';


type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

const PrivateRouteAdmin = ({ children, restrictedFor, redirectTo }: PrivateRouteProps): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authInfo = useAppSelector(getAuthInfo);

  return (
    authorizationStatus !== restrictedFor && authInfo?.isAdmin
      ? children
      : <Navigate to={redirectTo} />
  );
};

export default PrivateRouteAdmin;
