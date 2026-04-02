import { ChangeDetectionStrategy, Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { OrderStatus } from '../models/OrderStatus';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { NotificationService } from '../services/NotificationService';
import { Notification } from '../models/Notification';
import { OrderService } from '../services/OrderService';
import { Order } from '../models/Order';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements OnInit, OnDestroy {

  private orderSub!: Subscription;

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  

  constructor(private notificationService: NotificationService, private ngZone: NgZone, private orderService: OrderService) { }
  ngOnDestroy(): void {
    if (this.orderSub != null) {
      this.orderSub.unsubscribe();
    }
  }


  ngOnInit() {
    this.loadInitialOrders();
    this.getMessagesFromWS();
  }

loadInitialOrders() {
    this.orderSub = this.orderService.getAllOrders().subscribe({
      next: (orders:any) => {
        // sort latest first (optional)
         const sorted = orders.sort((a, b) =>
          (b.createdAt || 0) - (a.createdAt || 0)
         );

        this.ordersSubject.next(orders);
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      }
    });
  }

  //async 
  getMessagesFromWS() {
    this.notificationService.notifications$.subscribe(data => {
      if (!data) return;
      this.ngZone.run(() => {
        this.syncWithServer(data);   
      })
    }
    );
  }
  

  syncWithServer(newOrder: Notification) {
    const current = this.ordersSubject.value;
    const existing = current.find(o => o.orderId === newOrder.orderId);

    let updated: Order[];

    if (existing) {
      // 🧠 Ignore stale updates
      if (
        existing.createdAt &&
        newOrder.createdAt &&
        newOrder.createdAt < existing.createdAt
      ) {
        return;
      }

     // let updatedOrder:Order = {createdAt:newOrder.createdAt, orderId: newOrder.orderId, customerId:newOrder.userId, orderStatus: newOrder.message}

      updated = current.map(o =>
        o.orderId === newOrder.orderId
          ? { ...o, orderStatus: newOrder.message}
          : o
      );
    } else {
      // 🆕 New order
      let newOrderDetail:Order = {createdAt:newOrder.createdAt, orderId: newOrder.orderId, customerId:newOrder.userId, orderStatus: newOrder.message, currency:'USD'}
      updated = [newOrderDetail, ...current];
    }

    this.ordersSubject.next(updated);
  }

  // 🎯 TrackBy
  trackByOrderId(index: number, order: Order) {
    return order.orderId;
  }
}
