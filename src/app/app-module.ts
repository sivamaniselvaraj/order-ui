import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CreateOrder } from './create-order/create-order';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IdempotencyInterceptor } from './interceptors/idempotencyInterceptor';
import { Dashboard } from './dashboard/dashboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart-component/cart-component';

@NgModule({
  declarations: [
    App,
    CreateOrder,
    Dashboard,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgbModule
  ],
  providers: [
  //   {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: IdempotencyInterceptor,  
  //   multi: true
  // },
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
