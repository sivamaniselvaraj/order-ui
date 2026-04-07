import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { Item } from '../models/item.model';
import { ProductService } from '../services/product.service';
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
