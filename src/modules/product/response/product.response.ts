import {Expose} from 'class-transformer';
import { GuitarType } from '../../../types/guitar-type.enum.js';


export default class ProductResponse {
  @Expose()
  public id!: string ;

  @Expose()
  public title!: string ;

  @Expose()
  public description!: string;

  @Expose()
  public addDate!: string;

  @Expose()
  public photo!: string;

  @Expose()
  public guitarType!: GuitarType;

  @Expose()
  public article!: string;

  @Expose()
  public stringsCount!: number;

  @Expose()
  public price!: number;



}
