import { Component, OnInit, Inject } from '@angular/core';
import { ProductModel } from 'src/app/models/Products-model';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { AuthModel } from 'src/app/models/Auth-model';
import { ShopService } from 'src/app/services/shop.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.css'],
})
export class ShopComponent implements OnInit {
  public products: ProductModel[] = [];
  public user = new AuthModel(); // kick out un-logged users

  public activeProducts = [];
  public cats = [];
  public searchTerm = { term: '' };

  constructor(
    private shopService: ShopService,
    private router: Router,
    public dialog: MatDialog // , public dialog_ref: MatDialogRef< PopUpComponent >,
  ) // @Inject( MAT_DIALOG_DATA  ) public data?: number
  {}

  ngOnInit() {
    store.subscribe(() => {
      this.products = store.getState().products;
    });
    this.shopService.getAllcats().subscribe(
      (res) => {
        this.cats = res;
      },
      (err) => alert(err.message)
    );

    this.products = store.getState().products;
    this.activeProducts = this.products;

    this.user = store.getState().user;

    if (this.user === null) {
      this.router.navigateByUrl('/');
    }
  }
  public filterItems(catid: Number) {
    const selected = this.products.filter((product) => product.catID === catid);
    this.activeProducts = selected;
  }
  public unFilterItems() {
    this.activeProducts = this.products;
  }
  public search() {
    this.activeProducts = this.products;
    const selected = this.products.filter(
      (product) => product.itemName === this.searchTerm.term
    );
    this.activeProducts = selected;
  }
}
