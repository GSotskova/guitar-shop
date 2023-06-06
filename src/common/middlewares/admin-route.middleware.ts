import {StatusCodes} from 'http-status-codes';
import {NextFunction, Request, Response} from 'express';
import {MiddlewareInterface} from '../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';

export class AdminRouteMiddleware implements MiddlewareInterface {
  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!req.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'AdminRouteMiddleware'
      );
    }

    if (!req.user.isAdmin) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Changes are available only to the administrator',
        'AdminRouteMiddleware'
      );
    }

    return next();
  }
}
