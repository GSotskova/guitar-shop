import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { ProductType } from '../../types/products';
import { useAppDispatch } from '../../hooks';
import { deleteProduct } from '../../store/api-actions';


type CardProps = {
  products: ProductType[];
};

const CardList = ({products}: CardProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    dispatch(deleteProduct(id));
  };
  return (
    <ul className="catalog-cards__list">
      {products.map((product) => (
        <li className="catalog-item" key={product.id}>
          <div className="catalog-item__data">
            <img src={product.photo} width="36" height="93" alt="Картинка гитары" />
            <div className="catalog-item__data-wrapper">
              <Link to={`${AppRoute.Products}/${product.id}`} className="link">
                <p className="catalog-item__data-title">{product.title}</p>
              </Link>
              <br />
              <p className="catalog-item__data-date">Дата добавления {new Date(product.addDate).toLocaleDateString('ru-RU')}</p>
              <p className="catalog-item__data-price">{product.price} ₽</p>
            </div>
          </div>
          <div className="catalog-item__buttons">
            <Link
              className="button button--small button--black-border"
              to={`${AppRoute.Products}/${product.id}${AppRoute.Edit}`}
              aria-label="Редактировать товар">
                Редактировать
            </Link>
            <button
              className="button button--small button--black-border"
              type="button"
              aria-label="Удалить товар"
              onClick={(e) => {handleDeleteClick(e, product.id);}}
            >
                Удалить
            </button>
          </div>
        </li>
      )
      )}
    </ul>
  );
};

export default CardList;

