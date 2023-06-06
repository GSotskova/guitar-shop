import { GuitarType } from "./guitar-type.enum";

export type Product = {
    title: string;
    description: string;
    addDate: Date;
    photo: string;
    guitarType: GuitarType;
    article: string;
    stringsCount: number;
    price: number;
  }


