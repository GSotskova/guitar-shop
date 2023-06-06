import { Link } from 'react-router-dom';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import { AppRoute } from '../../constants';

function ProductShowPage(): JSX.Element {

  return (
    <div>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Login}>Вход</Link>
              </li>
              <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Products}>Товары</Link>
            </li>
            <li className="breadcrumbs__item"><a className="link">Товар</a>
            </li>
          </ul>
          <Card/>
        </div>
      </main>
  <Footer/>
</div>

  );
}

export default ProductShowPage;


