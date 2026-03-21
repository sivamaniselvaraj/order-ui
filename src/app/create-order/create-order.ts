import { Component } from '@angular/core';
import { OrderService } from '../services/OrderService';

@Component({
  selector: 'app-create-order',
  standalone: false,
  templateUrl: './create-order.html',
  styleUrl: './create-order.scss',
})
export class CreateOrder {
 userId: number = 0;
  type: string = 'ORDER_CREATED';
  response: string = '';

  constructor(private orderService: OrderService) {}

  createOrder() {
    this.orderService.createOrder({
      userId: this.userId,
      type: this.type
    }).subscribe(res => {
      this.response = 'Order Created!';
    });
  }
}
