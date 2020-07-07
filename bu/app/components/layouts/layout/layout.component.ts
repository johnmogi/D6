import { Component, OnInit } from '@angular/core';
import { AuthModel } from 'src/app/models/Auth-model';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { ProductModel } from 'src/app/models/Products-model';
import { ShopService } from 'src/app/services/shop.service';
import { ActionType } from 'src/app/redux/action-type';
import { OrderService } from 'src/app/services/order.service';
import { OrderModel } from 'src/app/models/Order-model';
import { CartModel } from 'src/app/models/Cart-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./master.css'],
})
export class LayoutComponent implements OnInit {
  // import everything to homepage from api to redux for further use:
  public products: ProductModel[] = [];
  public cartHolder: CartModel[] = [];
  public orders: OrderModel[] = [];

  public userCart = [];
  public userCartItems = [];
  public cartTime: String;
  public cartPrice: Number;

  public user = new AuthModel();
  public firstName: String;
  public firstVisit: String;
  public visitCounter: Boolean = false;

  constructor(
    private itemService: ShopService,
    private cartService: CartService,
    private orderService: OrderService,

    private router: Router
  ) {}

  ngOnInit() {
    store.subscribe(() => {
      this.products = store.getState().products; // * -products ready
      this.user = store.getState().user; // * -user ready - get cart:
      if (this.user && !this.user.isAdmin) {
        this.fetchCart(this.user.userID);
        this.firstName = this.user.firstName;
        this.firstVisit = this.user.firstVisit;
        this.visitCounter = true;
      }
    }); // store

    //* fetch products load into store
    this.itemService.getAllProducts().subscribe(
      (res) => {
        const action = {
          type: ActionType.getProducts,
          payload: res,
        };
        store.dispatch(action);
        this.products = res;
      },
      (err) => alert(err.message)
    );

    //* fetch categories load into store
    this.itemService.getAllcats().subscribe(
      (res) => {
        const action = {
          type: ActionType.getCats,
          payload: res,
        };
        store.dispatch(action);
        // this.cats = res;
      },
      (err) => alert(err.message)
    );

    //* fetch orders load into store
    this.orderService.getAllorders().subscribe(
      (res) => {
        const action = { type: ActionType.getOrders, payload: res };
        store.dispatch(action);
        this.orders = res;
      },
      (err) => alert(err.message)
    );

    //* fetch cartItems from store
    console.table('cartID :', this.userCart);
    //  this.cartService.fetchItems().subscribe(
    //    (res) => {
    //      const action = { type: ActionType.getOrders, payload: res };
    //      store.dispatch(action);
    //      this.orders = res;
    //    },
    //    (err) => alert(err.message)
    //  );

    this.orders = store.getState().orders;
    this.products = store.getState().products;
  } //ngoninit

  public logout(): void {
    const action = { type: ActionType.userLogout, payload: null };
    store.dispatch(action);
    localStorage.removeItem('token');
    this.userCart = [];
    this.router.navigateByUrl('/');
  }

  public async fetchCart(id: Number) {
    this.cartService.findCart(id).subscribe(
      (res) => {
        this.userCart[0] = res[0];
        this.cartTime = this.userCart[0].cartTime;

        this.fetchCartItems(res[0].cartID);
        // console.table('user:' + JSON.stringify(res[0].cartID));
      },
      (err) => this.makeCart(id) //! look in login for correct failure responses... logically- because of order option to delete cart ):
    );
  }
  public async fetchCartItems(id: Number) {
    console.table('cart:' + id);
    this.cartService.fetchItems(id).subscribe(
      (res) => {
        if (res.length > 0) {
          console.table('cart has items:' + JSON.stringify(res.length));
          this.userCartItems[0] = res[0];
          this.cartPrice = this.userCartItems[0].totalPrice;
        }
      },
      (err) => err.message
    );
  }
  public makeCart(id: Number) {
    console.table('user for new cart : ' + id);
    this.cartService.makeCart(id).subscribe(
      (res) => {
        this.userCart[0] = res[0];
        console.table('new cart :' + JSON.stringify(res[0]));
      },
      (err) => err.message
    );
  }
} // LayoutComponent
