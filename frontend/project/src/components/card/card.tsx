import {Link, useParams} from 'react-router-dom';
import { ProductType } from '../../types/products';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsProductLoading, getProduct } from '../../store/products-data/selectors';
import { useEffect } from 'react';
import { fetchProduct } from '../../store/api-actions';

const Card = () => {

  const params = useParams();
  const dispatch = useAppDispatch();
  const isProductLoading = useAppSelector(getIsProductLoading);
  const product = useAppSelector(getProduct);

  useEffect(() => {
    const { id } = params;
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [params, dispatch]);


  if (!product) {
    return null;
  }

  return (

      <div className="product-container">
        <img className="product-container__img" src={product.photo}  width="90" height="235" alt=""/>
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">{product.title}</h2>
          <br/>
          <br/>
          <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
            <div className="tabs__content" id="characteristics">
              <table className="tabs__table">
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{product.article}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{product.guitarType}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{product.stringsCount} струнная</td>
                </tr>
              </table>
              <p className="tabs__product-description hidden">{product.description}</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Card;
