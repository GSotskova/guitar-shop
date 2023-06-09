import {inject, injectable} from 'inversify';
import {ProductServiceInterface} from './product-service.interface.js';
import CreateProductDto from './dto/create-product.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {ProductEntity} from './product.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import UpdateProductDto from './dto/update-product.dto.js';
import { ProductQuery } from './query/product.query.js';
import { SomeObject } from '../../types/some-object.interface.js';
import { DEFAULT_PRODUCT_IMAGES, DEFAULT_PRODUCT_COUNT } from './product.constant.js';
import { getRandomItem } from '../../utils/random.js';


@injectable()
export default class ProductService implements ProductServiceInterface {

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.ProductModel) private readonly productModel: types.ModelType<ProductEntity>,
  ) {}

  public async create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>> {
    const randomProductPhoto = getRandomItem(DEFAULT_PRODUCT_IMAGES);
    const result = await this.productModel.create({...dto, photo: randomProductPhoto});

    this.logger.info(`New product created: ${dto.title}`);

    return result;

  }

  public async findById(productId: string): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel
      .findById(productId)
      .exec();
  }

  public async findByTitle(title: string): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel.findOne({title}).exec();
  }

  public async find(query: ProductQuery): Promise<DocumentType<ProductEntity>[]> {
    const {limit, sortDate, sortPrice, page, guitarType, stringsCount}= query;
    const pageNum = page? page : 0;
    const limitNum = limit? limit : DEFAULT_PRODUCT_COUNT;
    const objSort: SomeObject = {};
    const keys = Object.keys(query);
    keys.forEach(key => {
      key === 'sortDate'? objSort.addDate = sortDate : '';
      key === 'sortPrice'? objSort.price = sortPrice : '';
    });

    const objFiltr: SomeObject = {};
      if (query.guitarType) {objFiltr.guitarType = guitarType;}
      if (query.stringsCount) {objFiltr.stringsCount = stringsCount;}
     return this.productModel
    .find(objFiltr)
    .sort(objSort)
    .skip(pageNum * limitNum) 
    .limit( limitNum )
    .exec();
  }

  public async findNew(): Promise<DocumentType<ProductEntity>[]> {
    return this.productModel
      .find()
      .exec();
  }

  public async findAll(): Promise<DocumentType<ProductEntity>[]> {
    return this.productModel
      .find()
      .exec();
  }



  public async updateById(productId: string, dto: UpdateProductDto): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel
      .findByIdAndUpdate(productId, dto, {new: true})
      .exec();
  }


  public async deleteById(productId: string): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel
      .findByIdAndDelete(productId)
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.productModel
      .exists({_id: documentId})) !== null;
  }


}
