import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

   private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

   push(notification: Notification) {
    this.notificationSubject.next(notification);
  }
}