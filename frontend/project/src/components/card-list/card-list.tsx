import { useAppSelector } from '../../hooks';
import { getProducts, getProductsDataLoadingStatus } from '../../store/products-data/selectors';



const CardList = () => {
  const isProductsLoading = useAppSelector(getProductsDataLoadingStatus);
  const products = useAppSelector(getProducts);

  return (
    <ul className="catalog-cards__list">
    {products.map((product) =>
        (
          <li className="catalog-item" key={product.id}>
            <div className="catalog-item__data">
              <img src="img/content/catalog-product-1.png" srcSet={product.photo} width="36" height="93" alt="Картинка гитары"/>
              <div className="catalog-item__data-wrapper">
                <a className="link" href="./product.html"><p className="catalog-item__data-title">{product.title}</p></a>
                <br/>
                <p className="catalog-item__data-date">Дата добавления {new Date(product.addDate).toLocaleDateString('ru-RU')}</p>
                <p className="catalog-item__data-price">{product.price} ₽</p>
              </div>
            </div>
            <div className="catalog-item__buttons">
              <a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
              <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
            </div>
          </li>
        )
      )
    }
</ul>
  );
};

export default CardList;
