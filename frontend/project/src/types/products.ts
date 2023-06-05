export enum GuitarType {
  Electro= 'электро',
  Acoustic = 'акустика',
  Ukulele = 'укулеле'
}

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


