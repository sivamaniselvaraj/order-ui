import { Component,OnInit } from '@angular/core';
import { OrderService } from '../services/OrderService';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/CartService';
import { CartItem } from '../models/CartItem';
import { Item } from '../models/Item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-component',
  standalone: false,
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss',
})
export class CartComponent implements OnInit {

   cart: CartItem[] = [];

   showSuccess = true;
  loading = true;
  order_number = 0;

constructor(private modalService: NgbModal, private orderService: OrderService, private cartService: CartService, private router: Router){

}
openConfirmModal(content: any) {
  this.modalService.open(content, { centered: true });
}


  confirmOrder(modal: any)  {

    const orderPayload = {
      customerId: '123',
      items: this.cart,
      totalAmount: this.getTotal()
    };

    this.orderService.createOrder(orderPayload)
      .subscribe({
        next: (res:any) => {
          modal.close()
          this.showSuccess = true;
          this.loading = true;
          this.order_number = res.order_id;
          
          setTimeout(()=>{
              this.showSuccess=false
             this.loading=false
            }, 3000);
            this.router.navigate(['/dashboard']); 
        },
        error: () => {
          alert('❌ Failed to place order');
        }
      });
      this.cartService.clear() // clear cart
  }


  ngOnInit() {
    this.cartService.cart$.subscribe(data => {
      this.cart = data;
      this.loading = false;
    });
  }

  increaseQuantity(i: number) {
    this.cartService.increase(i);
  }

  decreaseQuantity(i: number) {
    this.cartService.decrease(i);
  }

  removeItem(item:Item ) {
    this.cartService.remove(item);
  }

  getTotal() {
    return this.cartService.getTotal();
  }

}
