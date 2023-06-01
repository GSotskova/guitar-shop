import {inject, injectable} from 'inversify';
import {ProductServiceInterface} from './product-service.interface.js';
import CreateProductDto from './dto/create-product.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {ProductEntity} from './product.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import UpdateProductDto from './dto/update-product.dto.js';
import {DEFAULT_PRODUCT_COUNT} from './product.constant.js';
import {SortType} from '../../types/sort-type.enum.js';


@injectable()
export default class ProductService implements ProductServiceInterface {

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.ProductModel) private readonly productModel: types.ModelType<ProductEntity>,
  ) {}

  public async create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>> {
    
    const result = await this.productModel.create(dto);

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

  public async find(): Promise<DocumentType<ProductEntity>[]> {
     return this.productModel
    .find({}, {DEFAULT_PRODUCT_COUNT})
    .sort({postDate: SortType.Down})
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
