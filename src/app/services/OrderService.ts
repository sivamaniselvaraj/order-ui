import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private http: HttpClient) {}

  createOrder(data: any) {
    return this.http.post('http://localhost:8081/orders', data);
  }
}