import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import {DEFAULT_PRODUCT_COUNT} from '../product.constant.js';
import { GuitarType } from '../../../types/guitar-type.enum';

export class ProductQuery {
  @Transform(({ value } ) => +value || DEFAULT_PRODUCT_COUNT)
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDate?: 'desc' | 'asc' ;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortPrice?: 'desc' | 'asc';

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;

  @IsEnum(GuitarType)
  @IsOptional()
  public guitarType?: GuitarType;

  @IsOptional()
  public stringsCount?: number;
}