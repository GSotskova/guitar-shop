import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import ProductForm from '../../components/product-form/product-form';
import { AppRoute } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { postProduct } from '../../store/api-actions';
import { EMPTY_GUITAR_TYPE, ProductNew } from '../../types/products';

const emptyProduct: ProductNew = {
  title: '',
  description: '',
  addDate: new Date(),
  photo: '',
  guitarType: EMPTY_GUITAR_TYPE,
  article: '',
  stringsCount: 4,
  price: 0
};

function NewProductPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (productData: ProductNew) => {
    dispatch(postProduct(productData));
  };
  return (
    <div>
      <main className="page-content">
        <section className="add-item">
          <div className="container">
            <h1 className="add-item__title">Новый товар</h1>
            <ul className="breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Login}>Вход</Link>
              </li>
              <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Products}>Товары</Link>
              </li>
              <li className="breadcrumbs__item"><a className="link">Новый товар</a>
              </li>
            </ul>
           <ProductForm product={emptyProduct} onSubmit={handleFormSubmit} />
          </div>
        </section>
      </main>
  <Footer/>
</div>

  );
}

export default NewProductPage;


