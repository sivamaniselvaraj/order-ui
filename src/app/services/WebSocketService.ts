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
    console.log(socket)
    this.stompClient = Stomp.over(socket);

    console.log(this.stompClient);

    this.stompClient.connect({_urlInfo:{sameOrigin:true}}, () => {
      this.stompClient.subscribe('/topic/notifications', (message: any) => {
        console.log("message ", message)
        this.subject.next(JSON.parse(message.body));
      });
    });
  }

  getMessages() {
    return this.subject.asObservable();
  }
}