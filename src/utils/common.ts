import { GuitarType } from '../types/guitar-type.enum.js';
import { Product } from '../types/product.type.js';

export const createProduct = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, createdDate, photo, guitarType, stringsCount, price, article, name, email] = tokens;
  return {
    title,
    description,
    addDate: new Date(createdDate),
    photo,
    guitarType: GuitarType[guitarType as 'Electro' | 'Acoustic' | 'Ukulele'],
    article,
    price: Number.parseInt(price, 10),
    user: {name, email},
    stringsCount: Number.parseInt(stringsCount)
  } as Product;
};