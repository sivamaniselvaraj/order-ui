import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemList } from './item-list/item-list';
import { Dashboard } from './dashboard/dashboard';
import { CartComponent } from './cart-component/cart-component';
import { ProcessingComponent } from './processing-component/processing-component';

const routes: Routes = [ 
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'product', component: ItemList },
  { path: 'cart', component: CartComponent },
  { path: 'process-order', component: ProcessingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
