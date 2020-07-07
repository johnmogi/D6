import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ShopComponent } from './components/pages/shop/shop.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { AdminComponent } from './components/pages/auth/admin/admin.component';
import { ItemComponent } from './components/pages/item/item.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { EditItemComponent } from './components/pages/auth/edit-item/edit-item.component';
import { AddItemComponent } from './components/pages/auth/add-item/add-item.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'shop/item/:id',
    component: ItemComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: AdminComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },

  {
    path: 'dashboard/edit/:id',
    component: EditItemComponent,
  },
  {
    path: 'dashboard/add-item',
    component: AddItemComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
