import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';


@Injectable({ providedIn: 'root' })
export class ProductService {

      constructor(private http: HttpClient) { }

     getAllProducts() {
        //const key = this.generateIdempotencyKey();
        //localStorage.setItem('lastOrderKey', key);
        return this.http.get<Product[]>('http://localhost:8084/products');
      }

}