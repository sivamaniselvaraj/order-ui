import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../services/OrderService';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../services/WebSocketService';
import { Item } from '../models/Item';
import { CartItem } from '../models/CartItem';
import { OrderStatus } from '../models/OrderStatus';

@Component({
  selector: 'app-create-order',
  standalone: false,  // Signals are often used in standalone components
  templateUrl: './create-order.html',
  styleUrl: './create-order.scss',
})


export class CreateOrder implements OnInit, OnDestroy{

 
  type: string = 'ORDER_CREATED';
  response: string = '';


  messages: string[] = [];
  private messagesSub!: Subscription;

  items: Item[] = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Phone', price: 20000 },
    { id: 3, name: 'Headphones', price: 3000 }
  ];

  cart: CartItem[] = [];

  constructor(private orderService: OrderService, private wsSockjs: WebSocketService) {

  }

  
  addToCart(item: Item) {

    const existing = this.cart.find(c => c.id === item.id);

    if (existing) {
      existing.quantity += 1; // 🔥 increment
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
  }

  // 🔻 Decrease quantity
  decreaseQuantity(index: number) {
    const item = this.cart[index];

    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.cart.splice(index, 1); // remove if 0
    }
  }

  // 🔼 Increase quantity
  increaseQuantity(index: number) {
    this.cart[index].quantity++;
  }

  
  // Remove by item (removes first match)
  removeItem(item: Item) {
    const index = this.cart.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  // 💰 Total
  getTotal(): number {
    return this.cart.reduce((sum, item) =>
      sum + (item.price * item.quantity), 0);
  }
  
  clearCart() {
  this.cart = [];
}

  placeOrder() {

    const orderPayload = {
      customerId: '123',
      items: this.cart,
      totalAmount: this.getTotal()
    };

    this.orderService.createOrder(orderPayload)
      .subscribe({
        next: (res:any) => {
          this.response = 'Order Created! Order #: ' + res.orderId;
          this.clearCart() // clear cart
          alert('✅ Order placed successfully!');
        },
        error: () => {
          alert('❌ Failed to place order');
        }
      });
  }

  ngOnDestroy(): void {
    this.messagesSub.unsubscribe();
  }
  ngOnInit(): void {
  
  // this.messagesSub = this.wsService.connect().subscribe(
  //       message => this.messages.push(message.content),
  //       err => console.error(err),
  //       () => console.log('connection complete')
  //   );
  // this.wsSockjs.connect();

  //       this.messagesSub = this.wsSockjs.getMessages().subscribe({
  //       next: (message) => {
  //         console.log(message.getValue())
  //         this.messages.push(message)
  //          console.log("notification messages ", this.messages)
  //       },
  //       error: (error) => {
  //         console.error(error)
  //       },
  //       complete: () => {
  //         console.log('connection complete')
  //       }
  //     }
  //   );
  }

  // createOrder() {
  //   this.orderService.createOrder({
  //     userId: 1234
  //   }).subscribe((res) => {
  //     this.response = 'Order Created! Order #: ';
  //   });
  // }

   resetForm() {

  }
}
