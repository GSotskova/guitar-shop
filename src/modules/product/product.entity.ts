import typegoose, {defaultClasses, getModelForClass} from '@typegoose/typegoose';
import { GuitarType } from '../../types/guitar-type.enum.js';

const {prop, modelOptions} = typegoose;

export interface ProductEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'products'
  }
})
export class ProductEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public addDate!: Date;

  @prop({default: ''})
  public photo!: string;

  @prop({
    type: () => String,
    enum: GuitarType
  })
  public guitarType!: GuitarType;

  @prop()
  public article!: string;

  @prop({required: true})
  public stringsCount!: number;

  @prop()
  public price!: number;


}

export const ProductModel = getModelForClass(ProductEntity);
