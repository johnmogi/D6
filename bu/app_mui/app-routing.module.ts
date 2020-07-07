import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ShopComponent } from './components/pages/retail/shop/shop.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { DashboardComponent } from './components/pages/auth/dashboard/dashboard.component';
import { EditItemComponent } from './components/pages/auth/edit-item/edit-item.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: DashboardComponent },
  { path: 'admin/edit/:id', component: EditItemComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
