import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/WebSocketService';
import { OrderStatus } from '../models/OrderStatus';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{
orders: any = {};

  constructor(private wsService: WebSocketService) {}

  ngOnInit() {
    this.wsService.connect();

    this.wsService.getMessages().subscribe((data) => {
      this.orders[data.orderId] = data;
    });
  }

  getOrderList(): OrderStatus[] {
    console.log(this.orders)
    return Object.values(this.orders);
  }
}
