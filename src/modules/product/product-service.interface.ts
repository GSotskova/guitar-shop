import {DocumentType} from '@typegoose/typegoose';
import {ProductEntity} from './product.entity.js';
import CreateProductDto from './dto/create-product.dto.js';
import UpdateProductDto from './dto/update-product.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import { ProductQuery } from './query/product.query.js';

export interface ProductServiceInterface extends DocumentExistsInterface {
  create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>>;
  findById(productId: string): Promise<DocumentType<ProductEntity> | null>;
  findByTitle(title: string): Promise<DocumentType<ProductEntity> | null>;
  find(query: ProductQuery): Promise<DocumentType<ProductEntity>[]>;
  updateById(productId: string, dto: UpdateProductDto): Promise<DocumentType<ProductEntity> | null>;
  deleteById(productId: string): Promise<DocumentType<ProductEntity> | null>;

  exists(documentId: string): Promise<boolean>;
}
