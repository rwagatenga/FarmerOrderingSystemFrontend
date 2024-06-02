export enum ProductTypeEnum {
  SEED = "Seed",
  FERTILIZER = "Fertilizer",
}
export interface Pricing {
  _id?: string;
  productType: ProductTypeEnum;
  productID?: string;
  pricePerKg: number;
}
