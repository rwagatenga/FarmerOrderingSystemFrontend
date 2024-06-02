export enum OrderStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum PaymentStatus {
  PAID = "paid",
  UNPAID = "unpaid",
}

export interface Order {
  _id?: string;
  farmerID: string;
  landID: string;
  fertilizerID: string;
  seedID: string;
  fertilizerQuantityOrdered: number; // Quantity ordered in kgs
  seedQuantityOrdered: number; // Quantity ordered in kgs
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  seedPricePerUnit: number;
  seedTotalPrice: number;
  fertilizerPricePerUnit: number;
  fertilizerTotalPrice: number;
}
