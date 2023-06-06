import ProductDto from "../../dto/product/product.dto";
import UserWithTokenDto from "../../dto/user/user-with-token.dto";
import UserDto from "../../dto/user/user.dto";
import { ProductType } from "../../types/products";
import { UserType } from "../../types/users";


export const adaptLoginToClient =
  (user: UserWithTokenDto): UserType => ({
    name: user.name,
    email: user.email,
    token: user.token,
  });

export const adaptUserToClient =
  (user: UserDto): UserType => ({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin || false
  });

export const adaptProductsToClient =
  (products: ProductDto[]): ProductType[] =>
    products
      .map((product: ProductDto) => ({
        id: product.id.toString(),
        title: product.title,
        description: product.description,
        addDate: product.addDate,
        photo: product.photo,
        guitarType: product.guitarType,
        article: product.article,
        stringsCount: product.stringsCount,
        price: product.price
      }));

export const adaptProductToClient =
  (product: ProductDto): ProductType =>
    ({
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
