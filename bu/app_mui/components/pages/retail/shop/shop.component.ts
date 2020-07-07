import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/components/models/Products-model';
import { CartModel } from 'src/app/components/models/Cart-model';
import { CartItemModel } from 'src/app/components/models/Cart-Item-model';
import { AuthModel } from 'src/app/components/models/Auth-model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { store } from 'src/app/components/redux/store';
import { RetailService } from 'src/app/services/retail.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../item/item.component';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: [],
},
)
export class ShopComponent implements OnInit {
  public products: ProductModel[] = [];
  public product: ProductModel = new ProductModel();

  public cart: CartModel[] = []; //try to init cart here before add to cart....
  public newCart: CartModel = new CartModel();

  public getCart: CartItemModel[] = [];

  public makeCart = [];
  public user = new AuthModel(); // kick out un-logged users
  public activeProducts = [];
  public cats = [];
  public searchTerm = { term: '' };
  public addItem = { amount: '', productID: '', cartId: 0 };

  
  constructor(
    private cartService: CartService,
    private shopService: RetailService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    store.subscribe(() => {
      this.products = store.getState().products;
      this.getCart = store.getState().cartItems;
      this.cart = store.getState().cart;

     

      this.activeProducts = this.products;
      this.user = store.getState().user;
      if ((this.user = null)) {
        console.table('user?', this.user);
        this.router.navigateByUrl('/');
      }
    });

    this.shopService.getAllcats().subscribe(
      (res) => {
        this.cats = res;
      },
      (err) => alert(err.message)
    );

    this.products = store.getState().products;
    this.getCart = store.getState().cartItems;
    this.cart = store.getState().cart;
    setTimeout(() => {
      console.table('cart:', this.cart);
    }, 2000);
    this.activeProducts = this.products;
  }

  public addToCart(id) {
    //is the usercart loaded?
    this.addItem.cartId = +this.getCart[0].cartID;
    this.addItem.productID = id;

    this.cartService
      .addItemToCart(this.addItem, this.addItem.cartId)
      .subscribe((res) => console.log(res));
  }

  public filterItems(catid: Number) {
    console.log(catid)
    const selected = this.products.filter((product) => product.catID === catid);
    this.activeProducts = selected;
  }
  public unFilterItems() {
    this.activeProducts = this.products;
  }
  public search() {
    this.activeProducts = this.products;
    const selected = this.products.filter((product) => product.itemName === this.searchTerm.term.toLowerCase());
    this.activeProducts = selected;
  }
  // openDialog(item) {
  
  //   const dialogRef = this.dialog.open(ItemComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

}
