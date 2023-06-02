import * as core from 'express-serve-static-core';
import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import CreateProductDto from './dto/create-product.dto.js';
import {ProductServiceInterface} from './product-service.interface.js';

import {fillDTO} from '../../utils/common.js';
import ProductResponse from './response/product.response.js';
import UpdateProductDto from './dto/update-product.dto.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';

import { ConfigInterface } from '../../common/config/config.interface.js';
import { AdminRouteMiddleware } from '../../common/middlewares/admin-route.middleware.js';
import {UploadFileMiddleware} from '../../common/middlewares/upload-file.middleware.js';
import UploadImageResponse from './response/upload-photo.response.js';
import { ProductQuery } from './query/product.query.js';


type ParamsGetProduct = {
  productId: string;
}


@injectable()
export default class ProductController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.ProductServiceInterface) private readonly productService: ProductServiceInterface
  ) {
    super(logger, configService);
    this.logger.info('Register routes for ProductController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/create',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new AdminRouteMiddleware(),
        new ValidateDtoMiddleware(CreateProductDto)
      ]
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(this.productService, 'Product', 'productId'),
      ]
    });
    
    this.addRoute({
      path: '/:productId/edit',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new AdminRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new ValidateDtoMiddleware(UpdateProductDto),
        new DocumentExistsMiddleware(this.productService, 'Product', 'productId'),
      ]
    });
    this.addRoute({
      path: '/:productId/delete',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new AdminRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(this.productService, 'Product', 'productId'),
      ]
    });
    this.addRoute({
      path: '/:productId/photo',
      method: HttpMethod.Post,
      handler: this.uploadPhoto,
      middlewares: [
        new AdminRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'photo'),
      ]
    });
  }


  public async index(_req: Request, res: Response, query: ProductQuery): Promise<void> {
    const products = await this.productService.find(query);
    this.ok(res, fillDTO(ProductResponse, products));
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateProductDto>,
    res: Response
  ): Promise<void> {
    const {body} = req;
    const result = await this.productService.create({...body});
    const product = await this.productService.findById(result.id);
    this.created(res, fillDTO(ProductResponse, product));
  }

  public async show (
    {params}: Request<core.ParamsDictionary | ParamsGetProduct>,
    res: Response
  ): Promise<void> {
    const {productId} = params;
    const product = await this.productService.findById(productId);
    this.ok(res, fillDTO(ProductResponse, product));
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetProduct, Record<string, unknown>, UpdateProductDto>,
    res: Response
  ): Promise<void> {
    const updatedProduct = await this.productService.updateById(params.productId, body);
    this.ok(res, fillDTO(ProductResponse, updatedProduct));
  }


  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetProduct>,
    res: Response
  ): Promise<void> {
    const {productId} = params;
    const product = await this.productService.deleteById(productId);
    this.noContent(res, product);
  }

public async uploadPhoto(req: Request<core.ParamsDictionary | ParamsGetProduct>, res: Response) {
    const {productId} = req.params;
    const updateDto = { photo: req.file?.filename };
    await this.productService.updateById(productId, updateDto);
    this.created(res, fillDTO(UploadImageResponse, updateDto));
  }

}
