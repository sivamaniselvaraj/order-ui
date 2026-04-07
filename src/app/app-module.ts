import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IdempotencyInterceptor } from './interceptors/idempotencyInterceptor';
import { Dashboard } from './dashboard/dashboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart-component/cart-component';
import { ItemList } from './item-list/item-list';
import { ProcessingComponent } from './processing-component/processing-component';

@NgModule({
  declarations: [
    App,
    Dashboard,
    CartComponent,
    ItemList,
    ProcessingComponent
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
