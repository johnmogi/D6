import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { EditItemComponent } from './components/pages/auth/edit-item/edit-item.component';
import { AdminComponent } from './components/pages/auth/admin/admin.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { ShopComponent } from './components/pages/retail/shop/shop.component';
import { ItemComponent } from './components/pages/retail/item/item.component';
import { AddItemComponent } from './components/pages/auth/add-item/add-item.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { CheckoutComponent } from './components/pages/retail/checkout/checkout.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/item/:id', component: ItemComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin/edit/:id', component: EditItemComponent },
  { path: 'admin/add-item', component: AddItemComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
