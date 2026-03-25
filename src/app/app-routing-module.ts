import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrder } from './create-order/create-order';
import { Dashboard } from './dashboard/dashboard';

const routes: Routes = [ { path: '', component: Dashboard },{ path: 'create', component: CreateOrder }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
