import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../services/OrderService';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebSocketServiceSockjs } from '../services/WebSocketService';

@Component({
  selector: 'app-create-order',
  standalone: false,  // Signals are often used in standalone components
  templateUrl: './create-order.html',
  styleUrl: './create-order.scss',
})
export class CreateOrder implements OnInit, OnDestroy{
  orderForm: FormGroup;
  type: string = 'ORDER_CREATED';
  response: string = '';

  orderModel = { userId: '', totalAmount:'', currency:'' };

  messages: string[] = [];
  private messagesSub!: Subscription;


  constructor(private orderService: OrderService, private fBuilder: FormBuilder, private wsSockjs: WebSocketServiceSockjs) {
        this.orderForm = this.fBuilder.group({
    userId: ['', Validators.required], // control with initial value and validator
    totalAmount: ['',  Validators.required],
    currency: ['',  Validators.required]
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
  this.wsSockjs.connect()
  }



  createOrder() {
    this.orderService.createOrder({
      userId: this.orderForm.get('userId')?.value
    }).subscribe((res:any) => {
      console.log(res)
      this.response = 'Order Created! Order #: ' + res.orderId;
    });

      this.messagesSub = this.wsSockjs.getMessages().subscribe({
        next: (value) => {
          this.messages.push(value.content)
        },
        error: (error) => {
          console.error(error)
        },
        complete: () => {
          console.log('connection complete')
        }
      }
    );
    console.log("notification messages ", this.messages)
  }

   resetForm() {

  }
}
