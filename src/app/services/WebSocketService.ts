import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketServiceSockjs {

  private stompClient: any;
  private subject = new Subject<any>();

  connect() {
    const socket = new SockJS('http://localhost:8083/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({_urlInfo:{sameOrigin:true}}, () => {
      this.stompClient.subscribe('/topic/notifications', (message: any) => {
        this.subject.next(JSON.parse(message.body));
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

  getMessages() {
    return this.subject.asObservable();
  }
}