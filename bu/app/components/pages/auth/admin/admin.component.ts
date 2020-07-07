import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/Products-model';
import { store } from 'src/app/redux/store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [],
})
export class AdminComponent implements OnInit {
  public products: ProductModel[] = [];

  constructor() {}

  ngOnInit() {
    store.subscribe(() => {
      this.products = store.getState().products;
    });
    this.products = store.getState().products;
  }
}
