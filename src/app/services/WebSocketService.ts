import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {

  private stompClient: any;
  private subject = new Subject<any>();

  connect() {
    const socket = new SockJS('http://localhost:8082/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/order-status', (message: any) => {
        this.subject.next(JSON.parse(message.body));
      });
    });
  }

  getMessages() {
    return this.subject.asObservable();
  }
}