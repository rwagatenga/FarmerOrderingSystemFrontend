export interface Seed {
  _id?: string;
  name: string;
  quantityAvailable: number; // Quantity in kgs
  compatibleFertilizers: string[]; // (assuming it's an array of Fertilizer IDs)
  maxQuantityPerAcre: number; // Maximum quantity per acre, e.g., 1kg for maize
  pricePerKg: number;
  pricingID?: string;
}
