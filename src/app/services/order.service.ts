import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class OrderService {

  private baseUrl = 'http://localhost:8081/orders/';


  constructor(private http: HttpClient) { }

  createOrder(data: any) {
    const key = this.generateIdempotencyKey();
    localStorage.setItem('lastOrderKey', key);
    return this.http.post(`${this.baseUrl}`, data, {
      headers: {
        'Idempotency-Key': key
      }
    });
  }

  getAllOrders() {
    const key = this.generateIdempotencyKey();
    localStorage.setItem('lastOrderKey', key);
    return this.http.get<Order[]>(`${this.baseUrl}`, {
      headers: {
        'Idempotency-Key': key
      }
    });
  }

  generateIdempotencyKey(): string {
    return crypto.randomUUID();
  }
}