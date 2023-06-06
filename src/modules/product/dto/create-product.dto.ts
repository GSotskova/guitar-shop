import {IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsIn} from 'class-validator';
import {ArticleValidate, DescriptValidate, PriceValidate, STRINGS_COUNT, STRINGS_VALID, TitleValidate} from '../product.constant.js';
import { GuitarType } from '../../../types/guitar-type.enum.js';

export default class CreateProductDto {
  @MinLength(TitleValidate.MinTitleLength, {message: 'Минимальная длина наименования 10 символов'})
  @MaxLength(TitleValidate.MaxTitleLength, {message: 'Максимальная длина наименования 100 символов'})
  public title!: string;

  @MinLength(DescriptValidate.MinDescriptLength, {message: 'Минимальная длина описания товара 20 символов'})
  @MaxLength(DescriptValidate.MaxDescriptLength, {message: 'Максимальная длина описания товара 1024 символа'})
  public description!: string;

  @IsDateString({}, {message: 'Дата добавления товара. Должна быть действительная дата ISO'})
  public addDate!: Date;

  @IsEnum(GuitarType, {message: `Тип гитары. Один вариант из списка: электро, акустика, укулеле`})
  public guitarType!: GuitarType;

  @MinLength(ArticleValidate.MinArticleLength, {message: 'Минимальная длина артикула 5 символов'})
  @MaxLength(ArticleValidate.MaxArticleLength, {message: 'Максимальная длина артикула 40 символов'})
  public article!: string;


  @IsIn(STRINGS_COUNT, {message: `Количество струн. Один из вариантов: ${STRINGS_VALID}`})
  public stringsCount!: number;

  @IsInt()
  @Min(PriceValidate.MinPriceLength, {message: 'Минимальная цена 100'})
  @Max(PriceValidate.MaxPriceLength, {message: 'Максимальная цена 100000'})
  public price!: number;

}

