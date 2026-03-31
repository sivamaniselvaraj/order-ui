import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new BehaviorSubject<any>(null);
  notifications$ = this.notificationSubject.asObservable();

   push(message: Notification) {
    this.notificationSubject.next(message);
  }
}