import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrder } from './create-order/create-order';
import { Dashboard } from './dashboard/dashboard';
import { CartComponent } from './cart-component/cart-component';

const routes: Routes = [ 
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'create', component: CreateOrder },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
