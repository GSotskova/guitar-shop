import { GuitarType } from "../../types/products";


export default class ProductDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public addDate!: Date;

  public photo!: string;

  public guitarType!: GuitarType;

  public article!: string;

  public stringsCount!: number;

  public price!: number;

}
