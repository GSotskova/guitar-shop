import got from 'got';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import ProductGenerator from '../common/product-generator/product-generator.js';
import { MockData } from '../types/mock-data.type.js';
import { CliCommandInterface } from './cli-command.interface.js';
import {createProduct, getErrorMessage} from '../utils/common.js';
import DatabaseService from '../common/database-client/database.service.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import {getURI} from '../utils/db.js';
import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import {ProductServiceInterface} from '../modules/product/product-service.interface.js';
import UserService from '../modules/user/user.service.js';
import ProductService from '../modules/product/product.service.js';
import {ProductModel} from '../modules/product/product.entity.js';
import {UserModel} from '../modules/user/user.entity.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import ConfigService from '../common/config/config.service.js';
import { USER_ADMIN } from '../modules/user/user.constant.js';

const DEFAULT_DB_PORT = 27017;

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;
  private userService!: UserServiceInterface;
  private productService!: ProductServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;
  private dbUser!: string;
  private dbPass!: string;
  private dbHost!: string;
  private dbName!: string;
  private config!: ConfigInterface;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.productService = new ProductService(this.logger, ProductModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
    this.config = new ConfigService(this.logger);
    this.salt = this.config.get('SALT');
    this.dbUser = this.config.get('DB_USER');
    this.dbPass = this.config.get('DB_PASSWORD');
    this.dbHost = this.config.get('DB_HOST');
    this.dbName = this.config.get('DB_NAME');
  }

  private async generateFileTest(...parameters:string[]): Promise<string> {
    const [count, filepath, url] = parameters;
    const productCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      console.log(`Can't fetch data from ${url}.`);
      return ' '
    }
    const productGeneratorString = new ProductGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < productCount; i++) {
      await tsvFileWriter.write(productGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);

    return filepath;
  }


  private async onLine(line: string, resolve: () => void) {
    const product = createProduct(line);
    await this.productService.create(product);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(...parameters:string[]): Promise<void> {
    
    const filename = await this.generateFileTest(...parameters);
    const uri = getURI(this.dbUser, this.dbPass, this.dbHost, DEFAULT_DB_PORT, this.dbName);
    await this.databaseService.connect(uri); 
    await this.userService.findOrCreate(USER_ADMIN, this.salt);
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
