import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layouts/layout/layout.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AdminComponent } from './components/pages/auth/admin/admin.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { ShopComponent } from './components/pages/retail/shop/shop.component';
import { OrderComponent } from './components/pages/retail/order/order.component';
import { CartComponent } from './components/pages/retail/cart/cart.component';
import { ItemComponent } from './components/pages/retail/item/item.component';
import { AddItemComponent } from './components/pages/auth/add-item/add-item.component';
import { EditItemComponent } from './components/pages/auth/edit-item/edit-item.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { LoginComponent } from './components/layouts/login/login.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { CheckoutComponent } from './components/pages/retail/checkout/checkout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    AdminComponent,
    RegisterComponent,
    ShopComponent,
    OrderComponent,
    CartComponent,
    ItemComponent,
    AddItemComponent,
    EditItemComponent,
    FooterComponent,
    LoginComponent,
    PageNotFoundComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
