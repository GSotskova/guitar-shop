import crypto from 'crypto';
import * as jose from 'jose';
import { GuitarType } from '../types/guitar-type.enum.js';
import { Product } from '../types/product.type.js';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { ServiceError } from '../types/service-error.enum.js';
import { ValidationErrorField } from '../types/validation-error-field.type.js';
import { ValidationError } from 'class-validator';
import {UnknownObject} from '../types/unknown-object.type.js';
import {DEFAULT_STATIC_IMAGES} from '../app/application.constant.js';

export const createProduct = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, createdDate, photo, guitarType, stringsCount, price, article, name, email] = tokens;
  return {
    title,
    description,
    addDate: new Date(createdDate),
    photo,
    guitarType: GuitarType[guitarType as 'Electro' | 'Acoustic' | 'Ukulele'],
    article,
    price: Number.parseInt(price, 10),
    user: {name, email},
    stringsCount: Number.parseInt(stringsCount)
  } as Product;
};

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

  export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
    errorType: serviceError,
    message,
    details: [...details]
  });
  
  export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

  export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

    export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownObject, transformFn);
      }
    });
};


export const transformObjectString = (property: string, staticPath: string, uploadPath: string, target: UnknownObject) => {
  const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
  target[property] = `${rootPath}/${target[property]}`;
};

export const transformObjectArray = (property: string, staticPath: string, uploadPath: string, target: UnknownObject) => {
  const targetArr = target[property] as string[];
  const resultArr: string[] = [];
  targetArr.forEach((el) => {
    const rootPath = DEFAULT_STATIC_IMAGES.includes(el) ? staticPath : uploadPath;
    el = `${rootPath}/${el}`;
    resultArr.push(el);
  });
  target[property] = resultArr;
};


export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data:UnknownObject) => {
  properties
    .forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
      if (target[property] instanceof Array) {
        transformObjectArray(property, staticPath, uploadPath, target);
      } else {
        transformObjectString(property, staticPath, uploadPath, target);
      }
    }));
};
