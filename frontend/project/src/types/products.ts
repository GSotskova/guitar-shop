export enum GuitarType {
  Electro= 'электро',
  Acoustic = 'акустика',
  Ukulele = 'укулеле'
}

export const GUITAR_TYPES = [GuitarType.Acoustic, GuitarType.Electro, GuitarType.Ukulele];
export const STRINGS_COUNT = [4,6,7,12];

export type ProductType = {
    id: string;
    title: string;
    description: string;
    addDate: Date;
    photo: string;
    guitarType: GuitarType;
    article: string;
    stringsCount: number;
    price: number;
  }

  export type ProductNew = {
    title: string;
    description: string;
    addDate: Date;
    photo: string;
    photoProduct?: File | undefined;
    guitarType: GuitarType;
    article: string;
    stringsCount: number;
    price: number;
  }

  export const EMPTY_GUITAR_TYPE = GuitarType.Electro
  export const EMPTY_STRINGS_COUNT = 4
  export const PAGINATION_COUNT = 7
  export const PAGINATION_STR_COUNT = 3
