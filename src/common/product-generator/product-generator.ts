import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, generateRandomString } from '../../utils/random.js';
import { ProductGeneratorInterface } from './product-generator.interface.js';

const MIN_PRICE = 100;
const MAX_PRICE = 1000000;

const MIN_STR_ARTICLE = 5;
const MAX_STR_ARTICLE = 40;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class ProductGenerator implements ProductGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const photo = getRandomItem<string>(this.mockData.photo);
    const guitarType = getRandomItem<string>(this.mockData.guitarTypes);
    const stringsCount = getRandomItem<string>(this.mockData.stringsCount);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const article = generateRandomString(MIN_STR_ARTICLE, MAX_STR_ARTICLE);

    return [
      title, description, createdDate, photo,
      guitarType, stringsCount, price,
      article
    ].join('\t');
  }
}
