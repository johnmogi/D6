import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/Products-model';
import { store } from 'src/app/redux/store';
import { AuthModel } from 'src/app/models/Auth-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.css'],
})
export class AdminComponent implements OnInit {
  public products: ProductModel[] = [];
  public user = new AuthModel(); // kick out un-logged users

  constructor(private router: Router) {}

  ngOnInit() {
    store.subscribe(() => {
      this.products = store.getState().products;
    });
    this.products = store.getState().products;

    this.user = store.getState().user;
    if (this.user === null || !this.user.isAdmin) {
      this.router.navigateByUrl('/');
    }
  }
}
