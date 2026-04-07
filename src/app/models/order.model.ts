import { Item } from "./item.model";

export interface Order {
  createdAt: string;          // ISO date string
  currency: string | null;
  customerId: number;
  idempotencyKey?: string;
  items?: Item[];
  orderId: number;
  orderStatus: string;        // consider enum if fixed values
  totalAmount?: number;
  updatedAt?: string | null;
}