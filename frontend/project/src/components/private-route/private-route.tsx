import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

const PrivateRoute = ({ children, restrictedFor, redirectTo }: PrivateRouteProps): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);


  return (
    authorizationStatus !== restrictedFor
      ? children
      : <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;
