import { Item } from "./item.model";

export interface CartItem extends Item{
  quantity: number; // 🔥 new
}