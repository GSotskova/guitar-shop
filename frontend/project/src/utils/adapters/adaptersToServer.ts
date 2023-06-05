import ProductDto from "../../dto/product/product.dto";
import UpdateProductDto from "../../dto/product/update-product.dto";
import UserDto from "../../dto/user/user.dto";
import { ProductType } from "../../types/products";
import { UserRegister } from "../../types/users";


export const adaptUserToServer =
  (user: UserRegister): UserDto => ({
    name: user.name,
    email: user.email,
    password: user.password
  });

export const adaptEditProductToServer =
  (product: ProductType): UpdateProductDto => ({
    id: product.id.toString(),
    title: product.title,
    description: product.description,
    addDate: product.addDate,
    photo: product.photo,
    guitarType: product.guitarType,
    article: product.article,
    stringsCount: product.stringsCount,
    price: product.price
  });

export const adaptCreateProductToServer =
  (product: ProductType): ProductDto => ({
    id: product.id.toString(),
    title: product.title,
    description: product.description,
    addDate: product.addDate,
    photo: product.photo,
    guitarType: product.guitarType,
    article: product.article,
    stringsCount: product.stringsCount,
    price: product.price
  });



export const adaptPhotoToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('photo', file);
    return formData;
  };

