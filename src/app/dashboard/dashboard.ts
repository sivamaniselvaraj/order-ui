import { ChangeDetectionStrategy, Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { OrderStatus } from '../models/OrderStatus';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/NotificationService';
import { Notification } from '../models/Notification';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements OnInit, OnDestroy {

  private messagesSub!: Subscription;
  messages: any[] = [];

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService, private ngZone: NgZone) { }
  ngOnDestroy(): void {
    if (this.messagesSub != null) {
      this.messagesSub.unsubscribe();
    }
  }


  ngOnInit() {
    this.getMessagesFromWS()
  }

  async getMessagesFromWS() {
    this.messagesSub = this.notificationService.notifications$.subscribe(data => {
      if (!data) return;
      this.ngZone.run(() => {
      const newMessage = { orderId: data.orderId, orderStatus: data.message };
        const existing = this.messages.find(o => o.orderId === newMessage.orderId);
        
        if(existing){
        this.messages.map(o =>
          o.orderId === newMessage.orderId ? { ...o, orderStatus: newMessage.orderStatus } : o
        );
         }
        else{
           this.messages.push(newMessage);
         }
      })
      console.log("getMessagesFromWS ", this.getNotificationList());
    }
    );
  }

  getNotificationList(): OrderStatus[] {
    console.log(this.messages)
    return this.messages;
    //return Object.values(this.orders);
  }
}
