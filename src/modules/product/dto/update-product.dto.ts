import {IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsIn, IsString, IsOptional} from 'class-validator';
import {STRINGS_COUNT} from '../product.constant.js';
import { GuitarType } from '../../../types/guitar-type.enum.js';

export default class UpdateProductDto {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public addDate!: Date;

  @IsOptional()
  @MaxLength(256, {message: 'Too short for field «image»'})
  public photo?: string;

  @IsEnum(GuitarType, {message: `GuitarType must be one of электро, аккустика, укулеле`})
  public guitarType!: GuitarType;

  @IsString( {message: 'isFavorite must be true or false'})
  public article!: string;


  @IsIn(STRINGS_COUNT)
  public stringsCount!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100000'})
  public price!: number;

}
