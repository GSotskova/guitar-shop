import {Route, Routes} from 'react-router-dom';
import LoginPage from '../../pages/login-page/login-page';
import { AppRoute, AuthorizationStatus } from '../../constants';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import RegistrationPage from '../../pages/registration-page/registration-page';
import ProductsPage from '../../pages/products-page/products-page';
import PrivateRoute from '../private-route/private-route';
import ProductShowPage from '../../pages/product-page/product-page';
import Header from '../header/header';
import NewProductPage from '../../pages/new-product-page/new-product-page';
import PrivateRouteAdmin from '../private-route-admin/private-route-admin';
import EditProductPage from '../../pages/edit-product-page/edit-product-page';


function App(): JSX.Element {
  return (
      <Routes>
        <Route element={<Header />}>
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Products}
            element={
              <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Login}
              >
                <ProductsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Registration}
            element={<RegistrationPage />}
          />
          <Route
          path={`${AppRoute.Products}/:id`}
          element={
            <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
              <ProductShowPage />
            </PrivateRoute>
          }
          />
          <Route
            path={AppRoute.Add}
            element={
              <PrivateRouteAdmin restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
                <NewProductPage />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path={`${AppRoute.Products}/:id${AppRoute.Edit}`}
            element={
              <PrivateRouteAdmin restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
                <EditProductPage />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
      </Route>
      </Routes>
  );
}

export default App;
