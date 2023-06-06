export const STRINGS_COUNT = [4, 6, 7, 12]
export const STRINGS_VALID = STRINGS_COUNT.join(', ')

export const DEFAULT_PRODUCT_COUNT = 7;


export const enum TitleValidate {
  MinTitleLength = 10,
  MaxTitleLength = 1000,
}

export const enum DescriptValidate {
  MinDescriptLength = 20,
  MaxDescriptLength = 1204,
}

export const enum ArticleValidate {
    MinArticleLength = 5,
    MaxArticleLength = 40,
}

export const enum PriceValidate {
    MinPriceLength = 100,
    MaxPriceLength = 1000000,
}

export const DEFAULT_PRODUCT_IMAGES = [
  'catalog-product-0.png',
  'catalog-product-1.png',
  'catalog-product-2.png',
  'catalog-product-3.png',
  'catalog-product-4.png',
  'catalog-product-5.png',
  'catalog-product-6.png',
  'catalog-product-7.png'
];