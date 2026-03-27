import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/CartItem';
import { Item } from '../models/Item';


@Injectable({ providedIn: 'root' })
export class CartService {

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  private cart: CartItem[] = [];

  addItem(item: any) {
    const existing = this.cart.find(c => c.id === item.id);

    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }

    this.cartSubject.next([...this.cart]);
  }

  increase(index: number) {
    this.cart[index].quantity++;
    this.cartSubject.next([...this.cart]);
  }

  decrease(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
    } else {
      this.cart.splice(index, 1);
    }
    this.cartSubject.next([...this.cart]);
  }

  remove(item: Item) {
    const index = this.cart.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  clear() {
    this.cart = [];
    this.cartSubject.next([]);
  }

  getTotal(): number {
    return this.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  getItems() {
    return this.cart;
  }
}