import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import ProductForm from '../../components/product-form/product-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { editProduct, fetchProduct } from '../../store/api-actions';
import {  ProductType } from '../../types/products';
import { getProduct } from '../../store/products-data/selectors';
import { useEffect } from 'react';
import { AppRoute } from '../../constants';


function EditProductPage(): JSX.Element | null {
  const params = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(getProduct);

  useEffect(() => {
    const { id } = params;
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [params, dispatch]);

  const handleFormSubmit = (productData: ProductType) => {
    dispatch(editProduct(productData));
  };

  if (!product) {
    return null;
  }

  return (
    <div>
      <main className="page-content">
        <section className="edit-item">
          <div className="container">
            <h1 className="edit-item__title">{product.title}</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Login}>Вход</Link>
              </li>
              <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Products}>Товары</Link>
              </li>
              <li className="breadcrumbs__item"><a className="link">{product.title}</a>
              </li>
            </ul>
            <ProductForm product={product} onSubmit={handleFormSubmit} />
          </div>
        </section>
      </main>
  <Footer/>
</div>

  );
}

export default EditProductPage;


