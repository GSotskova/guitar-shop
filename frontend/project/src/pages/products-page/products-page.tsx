import { Link, useNavigate } from 'react-router-dom';
import CardList from '../../components/card-list/card-list';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import { getProducts, getProductsDataLoadingStatus } from '../../store/products-data/selectors';
import { useState, MouseEvent } from 'react';
import { PAGINATION_COUNT, PAGINATION_STR_COUNT, ProductType } from '../../types/products';
import { AppRoute } from '../../constants';

function ProductsPage(): JSX.Element {
  const isProductsLoading = useAppSelector(getProductsDataLoadingStatus);
  const products = useAppSelector(getProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstPageVisible, setfirstPageVisible] = useState(1);

  const indexOfLastProduct = currentPage * PAGINATION_COUNT;
  const indexOfFirstProduct = indexOfLastProduct - PAGINATION_COUNT;
  const currentProducts: ProductType[] = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / PAGINATION_COUNT); i++) {
      pageNumbers.push(i);
    }

   const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    if (evt.currentTarget.textContent === 'Назад') {
      setCurrentPage(currentPage-1);
      if (currentPage <= firstPageVisible) {setfirstPageVisible(currentPage- 3)}
    }
    else if (evt.currentTarget.textContent === 'Далее') {
      setCurrentPage(currentPage+1);
      setfirstPageVisible(currentPage+1)

    }
    else {
    setCurrentPage(Number(evt.currentTarget.textContent));
    }
    }

    const pageNumbersVisible = pageNumbers.slice(firstPageVisible - 1 , firstPageVisible+ 2 )

    const renderPageNumbers = pageNumbersVisible.map(number => {
      return (
          <li
            key={number}
            className={currentPage === number ? "pagination__page pagination__page--active" : "pagination__page pagination__page"}
            >
            <Link
              className="link pagination__page-link"
              onClick={handleClick}
              to={AppRoute.Products}
            >
                {number}
            </Link>
          </li>
      );
    });

    const navigate = useNavigate();

  return (
    <div>
    <main className="page-content">
    <section className="product-list">
      <div className="container">
        <h1 className="product-list__title">Список товаров</h1>
        <ul className="breadcrumbs">
          <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Login}>Вход</Link>
          </li>
          <li className="breadcrumbs__item"><a className="link">Товары</a>
          </li>
        </ul>
        <div className="catalog">
          <form className="catalog-filter" action="#" method="post">
            <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
            <fieldset className="catalog-filter__block">
              <legend className="catalog-filter__block-title">Тип гитар</legend>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"/>
                <label htmlFor="acoustic">Акустические гитары</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="electric" name="electric" />
                <label htmlFor="electric">Электрогитары</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" />
                <label htmlFor="ukulele">Укулеле</label>
              </div>
            </fieldset>
            <fieldset className="catalog-filter__block">
              <legend className="catalog-filter__block-title">Количество струн</legend>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" />
                <label htmlFor="4-strings">4</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"/>
                <label htmlFor="6-strings">6</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"/>
                <label htmlFor="7-strings">7</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled/>
                <label htmlFor="12-strings">12</label>
              </div>
            </fieldset>
            <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
          </form>
          <div className="catalog-sort">
            <h2 className="catalog-sort__title">Сортировать:</h2>
            <div className="catalog-sort__type">
              <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене">по дате</button>
              <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
            </div>
            <div className="catalog-sort__order">
              <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
              <button className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active" aria-label="По убыванию"></button>
            </div>
          </div>
          <div className="catalog-cards">
            <CardList products={currentProducts}/>
          </div>
        </div>
        <button className="button product-list__button button--red button--big" onClick={() => navigate(AppRoute.Add)}>Добавить новый товар</button>
        <div className="pagination product-list__pagination">
          <ul className="pagination__list">
          {currentPage > 1 ? (
            <li className="pagination__page pagination__page--prev" id="prev">
            <Link
              className="link pagination__page-link"
              to={AppRoute.Products}
              onClick={handleClick}
            >
              Назад
            </Link>
          </li> ) : ''
          }
            {renderPageNumbers}

          {pageNumbers.length > PAGINATION_STR_COUNT &&  firstPageVisible+3 <= pageNumbers.length ? (
          <li
            className="pagination__page pagination__page--next"
            id="next">
            <Link
              className="link pagination__page-link"
              to={AppRoute.Products}
              onClick={handleClick}
            >
              Далее
            </Link>
          </li> ) : ''
          }
          </ul>
        </div>
      </div>
    </section>
  </main>
  <Footer/>
</div>

  );
}

export default ProductsPage;


