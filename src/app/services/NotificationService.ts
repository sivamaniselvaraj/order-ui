import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification } from '../models/Notification';
import { OrderStatus } from '../models/OrderStatus';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: OrderStatus[] = [];

  constructor(private ngZone: NgZone){}

  private notificationSubject = new BehaviorSubject<any>([null]);
  notifications$ = this.notificationSubject.asObservable();

   pushNotification(message: any) {
    this.notifications.push({orderId: message.orderId, orderStatus: message.message})
    this.notificationSubject.next(message);
  }

  
  getNotificationList():any[] {
    return this.notifications;
  }
}