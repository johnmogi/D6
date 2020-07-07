import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { LayoutMasterComponent } from './components/layouts/layout-master/layout-master.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ShopComponent } from './components/pages/retail/shop/shop.component';
import { ItemComponent } from './components/pages/retail/item/item.component';
import { OrderComponent } from './components/pages/retail/order/order.component';
import { CartComponent } from './components/pages/retail/cart/cart.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { DashboardComponent } from './components/pages/auth/dashboard/dashboard.component';
import { AddItemComponent } from './components/pages/auth/add-item/add-item.component';
import { EditItemComponent } from './components/pages/auth/edit-item/edit-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LayoutMasterComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    ItemComponent,
    OrderComponent,
    CartComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AddItemComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule, NgbModule
  ],
  providers: [],
  bootstrap: [LayoutMasterComponent]
})
export class AppModule { }
