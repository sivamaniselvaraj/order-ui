import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from '../services/CartService';
import { Item } from '../models/Item';
import { ProductService } from '../services/ProductService';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-item-list',
  standalone: false,
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
})
export class ItemList implements OnInit {

  showSuccess = false;
  loading = false;


    private productSubject = new BehaviorSubject<Product[]>([]);
    product$ = this.productSubject.asObservable();

  constructor(private cartService: CartService, private productService: ProductService) {

  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        console.log("response ", res)
        this.productSubject.next(res);
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }

  addToCart(item: Item) {
    this.cartService.addItem(item);
  }

}
