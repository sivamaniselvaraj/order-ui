import { Component, OnInit, OnDestroy, model } from '@angular/core';
import { OrderService } from '../services/OrderService';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../services/WebSocketService';
import { Item } from '../models/Item';
import { CartItem } from '../models/CartItem';
import { OrderStatus } from '../models/OrderStatus';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/CartService';

@Component({
  selector: 'app-create-order',
  standalone: false,  // Signals are often used in standalone components
  templateUrl: './create-order.html',
  styleUrl: './create-order.scss',
})


export class CreateOrder{

  showSuccess = false;
  loading = false;
  items: Item[] = [
    { id: 1, name: 'Laptop', price: 50000, description: 'High performance laptop for work and gaming.',
      image: ''},
    { id: 2, name: 'Phone', price: 20000,description: 'Smartphone with excellent camera and battery.',
      image: '' },
    { id: 3, name: 'Headphones', price: 3000, description: 'Noise cancelling over-ear headphones.',
      image: '' }
  ];

  cart: CartItem[] = [];
  order_number: any ='';

  constructor(private cartService: CartService
  ) {

  }

  
  addToCart(item: Item) {
    this.cartService.addItem(item);

  }

  
}
