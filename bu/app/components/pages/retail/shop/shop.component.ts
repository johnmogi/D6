import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/Products-model';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { AuthModel } from 'src/app/models/Auth-model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: [],
})
export class ShopComponent implements OnInit {
  public products: ProductModel[] = [];
  public user = new AuthModel(); // kick out un-logged users

  // public product: ProductModel = new ProductModel();

  constructor(private router: Router) {}

  ngOnInit() {
    store.subscribe(() => {
      this.products = store.getState().products;
    });
    this.products = store.getState().products;
    this.user = store.getState().user;

    if (this.user === null) {
      this.router.navigateByUrl('/');
    }
  }
}
