import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/components/models/Products-model';
import { store } from 'src/app/components/redux/store';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styles: [],
})
export class ItemComponent implements OnInit {
  public products: ProductModel[] = [];
  constructor() {}
  ngOnInit() {
    store.subscribe(() => {
      this.products = store.getState().products;
    });

    this.products = store.getState().products;
  }
}
