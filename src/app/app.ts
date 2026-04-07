import { Component, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { CartService } from './services/cart.service';
import { WebSocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy{
  protected readonly title = signal('order-ui');

  cartCount: number = 0;

  constructor(private cartService: CartService, private wsService: WebSocketService) { }

  ngOnInit(): void {
     this.wsService.connect();
    // subscribe to cart count
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  ngOnDestroy(): void {
    this.wsService.disconnect();
  }
}

