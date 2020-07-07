import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/Products-model';
import { CartModel } from 'src/app/models/Cart-model';
import { OrderModel } from 'src/app/models/Order-model';
import { AuthModel } from 'src/app/models/Auth-model';
import { ShopService } from 'src/app/services/shop.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.css'],
})
export class LayoutComponent implements OnInit {
  // import everything to homepage from api to redux for further use:
  public cartData = 0;
  public products: ProductModel[] = [];
  public cartHolder: CartModel[] = [];
  public orders: OrderModel[] = [];
  public userOrder = [];
  public userCart = [];
  public userCartItems = [];
  public cartDate: String;
  public cartPrice: Number;
  public cartLoop: Boolean = false;
  public user = new AuthModel();
  public firstName: String;
  public firstVisit: Number;
  public visitCounter: Boolean = false;
  public isAdmin: Boolean = false;
  public totalPrice = 0;
  public size: Boolean = false;

  constructor(
    private itemService: ShopService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}
  ngOnInit() {
    store.subscribe(() => {
      this.products = store.getState().products;
      this.user = store.getState().user; // * -user ready - get cart:
      if (this.user && this.user.isAdmin) {
        this.isAdmin = true;
      }
      if (this.user && !this.user.isAdmin) {
        this.isAdmin = false;

        if (!this.userOrder) {
          this.fetchOrder(this.user.userID);
        }
        if (!this.userCart) {
          this.fetchCart(this.user.userID);
        }
        this.firstName = this.user.firstName;
        this.firstVisit = +this.user.firstVisit;
        this.visitCounter = true;
      }
    });
    // store
    // * fetch products load into store
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

    // * fetch Orders load into store
    this.orderService.getAllorders().subscribe(
      (res) => {
        const action = {
          type: ActionType.getOrders,
          payload: res,
        };
        store.dispatch(action);
        this.orders = res;
      },
      (err) => alert(err.message)
    );

    this.products = store.getState().products;
    this.orders = store.getState().orders;
  } // ngonint

  public resize() {
    this.size = !this.size;
  }
  public logout(): void {
    const action = {
      type: ActionType.userLogout,
      payload: null,
    };
    store.dispatch(action);
    localStorage.removeItem('token');
    this.userCart = [];
    this.router.navigateByUrl('/');
  }
  public fetchCart(id) {
    this.cartService.findCart(id).subscribe(
      (res) => {
        this.userCart[0] = res[0];
        this.cartDate = this.userCart[0].cartTime;
        this.fetchCartItems(res[0].cartID);
      },
      (err) => err.message
    );
  }

  // * fetch user cart load into store
  public fetchCartItems(id) {
    this.cartService.fetchItems(id).subscribe(
      (res) => {
        if (this.resize.length > 0) {
          this.totalPrice = +res[0].totalPrice;
        }
        if (!this.cartLoop) {
          this.cartLoop = !this.cartLoop;
          const action = {
            type: ActionType.getCartItems,
            payload: res,
          };
          store.dispatch(action);
        }
        this.userCartItems = res;
      },
      (err) => alert(err.message)
    );
  }
  public fetchOrder(userID) {
    this.orderService.getOneUserOrderAsync(userID).subscribe(
      (res) => {
        this.userOrder[0] = res[-1]; //setting to last order
      },
      (err) => err.message
    );
  }
}
