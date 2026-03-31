import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subject } from 'rxjs';
import { NotificationService } from './NotificationService';

@Injectable({ providedIn: 'root' })
export class WebSocketService{

  private stompClient: any;

  constructor(private notificationService: NotificationService){

  }

  connect() {
    const socket = new SockJS('http://localhost:8083/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/notifications', (message: any) => {
        this.notificationService.push(JSON.parse(message.body));
      });
    }, () => {
      console.log('failed');
    });
  }

    disconnect() {
            if (this.stompClient != null) {
                this.stompClient.disconnect();
            }
            console.log("Disconnected");
        }

}