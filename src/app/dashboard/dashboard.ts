import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/WebSocketService';
import { OrderStatus } from '../models/OrderStatus';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/NotificationService';
import { Notification } from '../models/Notification';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{
orders: any = {};

private messagesSub!: Subscription;
messages: string[] = [];

notifications: Notification[] = [];
  latestMessage: string = '';

  constructor(private wsService: WebSocketService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.wsService.connect();

    // this.wsService.getMessages().subscribe((data) => {
    //   this.orders[data.orderId] = data;
    // });

          this.messagesSub = this.notificationService.notifications$.subscribe(data => {
          this.notifications.unshift(data);
          console.log("notification service message ", data)
          this.orders[data.orderId] = {orderId:data.orderId, orderStatus: data.message};
          //this.getOrderList();
           //console.log("notification messages ", this.messages)
      }
    );
  }

  getOrderList(): OrderStatus[] {
    console.log(this.orders)
    return this.orders;
    //return Object.values(this.orders);
  }
}
