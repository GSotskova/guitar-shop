import { ProductType, ProductNew, GUITAR_TYPES, EMPTY_GUITAR_TYPE, STRINGS_COUNT, EMPTY_STRINGS_COUNT } from '../../types/products';
import { ChangeEvent, FormEvent, Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../constants';


enum FormFieldName {
  title = 'title',
  description = 'description',
  addDate = 'addDate',
  photo = 'photo',
  guitarType = 'guitarType',
  article = 'article',
  stringsCount = 'stringsCount',
  price = 'price',
}


type ProductFormProps<T> = {
  product: T;
  onSubmit: (offerData: T) => void;
};

const ProductForm = <T extends ProductType | ProductNew>({
  product,
  onSubmit,
}: ProductFormProps<T>): JSX.Element => {



  const [photoProduct, setPhoto] = useState<File | undefined>();
  const handlePhotoUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setPhoto(evt.target.files[0]);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);;
  const handlePhotoDelete = () => {
    inputRef.current? inputRef.current.value = '' : '';
    setPhoto(undefined);
  };
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      ...product,
      title: formData.get(FormFieldName.title),
      description: formData.get(FormFieldName.description),
      addDate: formData.get(FormFieldName.addDate),
      photo: photoProduct,
      guitarType: typeData,
      article: formData.get(FormFieldName.article),
      stringsCount: stringsCn,
      price: Number(formData.get(FormFieldName.price)),
    };

    onSubmit(data);
  };

  const navigate = useNavigate();
  const routeChange = () => {
    navigate(AppRoute.Products);
  }


  const [typeData, setTypeData] = useState(EMPTY_GUITAR_TYPE);
  const [currentChecked, setCurrentChecked] = useState<string | null>(product.guitarType);

  const handleTypeChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setTypeData(typeData);
    evt.target.setAttribute('checked', 'true');
    if (name === 'item-type') {
      setCurrentChecked(value);
    }
  };


  const [stringsCn, setStringsCn] = useState(EMPTY_STRINGS_COUNT);
  const [currentCheckedCn, setCurrentCheckedCn] = useState<number | null>(product.stringsCount);

  const handleSringsCountChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setStringsCn(stringsCn);
    evt.target.setAttribute('checked', 'true');
    if (name === 'string-qty') {
      setCurrentCheckedCn(Number(value));
    }
  };


  return (

    <form
      className="add-item__form"
      action="#"
      method="get"
      onSubmit={handleFormSubmit}
      >
    <div className="add-item__form-left">
      <div className="edit-item-image add-item__form-image">
        <div className="edit-item-image__image-wrap">
        {photoProduct ? (
           <img
             className="register-form__image"
             src={URL.createObjectURL(photoProduct)}
             alt=" "
           />
        ) : (
          <img
            className="register-form__image"
            src={product.photo}
            alt=" "
          />
        )
        }
        </div>
        <div className="edit-item-image__btn-wrap">

        <input
          type="file"
          style={{display: 'none'}}
          placeholder="Preview image"
          name="photoFile"
          id="photoFile"
          accept="image/png, image/jpeg"
          ref={inputRef}
          onChange={handlePhotoUpload}
        />
        <label className="button button--small button--black-border edit-item-image__btn" htmlFor="photoFile">
        {product.title ? `Заменить` : `Добавить`}
        </label>
        <button
          className="button button--small button--black-border edit-item-image__btn"
          type="button"
          onClick={handlePhotoDelete}
        >Удалить</button>
        </div>
      </div>
      <div className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
        {GUITAR_TYPES.map((type) => (
          <Fragment key={type}>
            <input
              type="radio"
              id={type}
              name="item-type"
              value={type}
              onChange={handleTypeChange}
              checked={currentChecked === type}
            />
            <label htmlFor={type}>{type}</label>
          </Fragment>
          ))}



      </div>
      <div className="input-radio add-item__form-radio"><span>Количество струн</span>
      {STRINGS_COUNT.map((cn) => (
          <Fragment key={cn}>
            <input
              type="radio"
              id={`string-qty-${cn}`}
              name="string-qty"
              value={cn}
              onChange={handleSringsCountChange}
              checked={currentCheckedCn === cn}
            />
            <label htmlFor={`string-qty-${cn}`}>{cn}</label>
          </Fragment>
          ))}

      </div>
    </div>
    <div className="add-item__form-right">
      <div className="custom-input add-item__form-input">
        <label><span>Дата добавления товара</span>
          <input
            type="text"
            name={FormFieldName.addDate}
            placeholder="Дата в формате 00.00.0000"
            defaultValue={product.addDate.toString()}
           />
        </label>
        <p>Заполните поле</p>
      </div>
      <div className="custom-input add-item__form-input">
        <label><span>Введите наименование товара</span>
          <input
            type="text"
            name={FormFieldName.title}
            placeholder="Наименование"
            defaultValue={product.title}
          />
        </label>
        <p>Заполните поле</p>
      </div>
      <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
        <label><span>Введите цену товара</span>
          <input
            type="number"
            placeholder="100"
            name={FormFieldName.price}
            id="price"
            min="100"
            max="100000"
            defaultValue={product.price}
        />
        </label>
        <p>Заполните поле</p>
      </div>
      <div className="custom-input add-item__form-input">
        <label><span>Введите артикул товара</span>
          <input
            type="text"
            name={FormFieldName.article}
            placeholder="Артикул товара"
            defaultValue={product.article}
          />
        </label>
        <p>Заполните поле</p>
      </div>
      <div className="custom-textarea add-item__form-textarea">
        <label><span>Введите описание товара</span>
          <textarea
            name={FormFieldName.description}
            placeholder=""
            defaultValue={product.description}
          >
          </textarea>
        </label>
        <p>Заполните поле</p>
      </div>
    </div>
    <div className="add-item__form-buttons-wrap">
      <button className="button button--small add-item__form-button" type="submit">Сохранить изменения</button>
      <button
        className="button button--small add-item__form-button"
        type="button"
        onClick={routeChange}>
          Вернуться к списку товаров
        </button>
    </div>
  </form>
  );
};

export default ProductForm;
