import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layouts/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './components/layouts/layout/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ShopComponent } from './components/pages/shop/shop.component';
import { AdminComponent } from './components/pages/auth/admin/admin.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { CartComponent } from './components/layouts/cart/cart.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './components/pages/item/item.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { EditItemComponent } from './components/pages/auth/edit-item/edit-item.component';
import { AddItemComponent } from './components/pages/auth/add-item/add-item.component';
import { PopUpComponent } from './components/pages/pop-up/pop-up.component';
import { ReceiptComponent } from './components/pages/auth/receipt/receipt.component';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    AdminComponent,
    LoginComponent,
    CartComponent,
    ItemComponent,
    CheckoutComponent,
    RegisterComponent,
    PageNotFoundComponent,
    EditItemComponent,
    AddItemComponent,
    PopUpComponent,
    ReceiptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
