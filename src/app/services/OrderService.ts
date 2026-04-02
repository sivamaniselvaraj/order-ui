import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';


@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(data: any) {
    const key = this.generateIdempotencyKey();
    localStorage.setItem('lastOrderKey', key);
    return this.http.post('http://localhost:8081/orders', data, {
      headers: {
        'Idempotency-Key': key
      }
    });
  }

    getAllOrders() {
    const key = this.generateIdempotencyKey();
    localStorage.setItem('lastOrderKey', key);
    return this.http.get<Order[]>('http://localhost:8081/orders/', {
      headers: {
        'Idempotency-Key': key
      }
    });
  }

  generateIdempotencyKey(): string {
    return crypto.randomUUID();
  }
}