import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/Products-model';
import { CartModel } from '../../models/Cart-model';
import { OrderModel } from '../../models/Order-model';
import { CartItemModel } from '../../models/Cart-Item-model';
import { AuthModel } from '../../models/Auth-model';
import { RetailService } from 'src/app/services/retail.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import { BillingService } from 'src/app/services/billing.service';

@Component({
  selector: 'app-layout-master',
  templateUrl: './layout-master.component.html',
  styleUrls: ['./layout.css'],
})
export class LayoutMasterComponent implements OnInit {
  // ONE STORE TO RULE THEM ALL:
  public products: ProductModel[] = [];
  public cartHolder: CartModel[] = [];
  public orders: OrderModel[] = [];
  public userCart = [];
  public cartItems = new CartItemModel();
  public stopCartLoop: Boolean = false;
  // store usage
  public user = new AuthModel();
  public isAdmin = this.user.isAdmin;
  public cartDate: '';
  public totalPrice = 0;
  public size: Boolean = false;

  constructor(
    private itemService: RetailService,
    private cartService: CartService,
    private orderService: BillingService,
    private router: Router
  ) { }

  async ngOnInit() {
    store.subscribe(() => {
      this.products = store.getState().products; //* -products ready
      this.user = store.getState().user; //* -user ready - get cart:

      if (this.user && !this.user.isAdmin) {
        this.fetchCart(+this.user.userID);
      }
      this.cartHolder = store.getState().cart;
      this.orders = store.getState().orders;
    }); //store subscribe

    this.itemService.getAllProducts().subscribe(
      // fetch products
      (res) => {
        const action = { type: ActionType.getProducts, payload: res };
        store.dispatch(action);
        this.products = res;
      },
      (err) => alert(err.message)
    );

    this.products = store.getState().products;
    this.user = store.getState().user;
    this.cartHolder = store.getState().cart;
    // ------
    this.orderService.getAllorders().subscribe(
      (res) => {
        const action = { type: ActionType.getOrders, payload: res };
        store.dispatch(action);
        this.orders = res;
      },
      (err) => alert(err.message)
    );

    this.orders = store.getState().orders;
  } // ngonint

  public logout(): void {
    const action = { type: ActionType.userLogout, payload: null };
    store.dispatch(action);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  public async fetchCart(id: Number) {
    // fetch cart + items into store:
    this.cartService.findCart(id).subscribe(
      (res) => {
        if (!res) { this.makeNewCart(id) }
        console.log(res)
        console.table("empty" + res.length) //0?
        // stopping loop (created by subscribing to an ongoing event)...
        if (this.stopCartLoop === true) {
          return;
        }
        if (this.stopCartLoop === false) {
          this.stopCartLoop = true;
        }
        if (res.length < 1 && !this.user.isAdmin) {
          this.makeNewCart(id);
        }

        if (res.length > 0) {
          this.cartTime(res[0].cartTime);
          // console.table('cart: i have a cart', res);
          // send cartitems into store
          this.cartService.fetchItems(res[0].cartID).subscribe((response) => {
            //    console.table('push these items into store:', response);
            const action = { type: ActionType.getCartItems, payload: response };
            store.dispatch(action);
            this.userCart = response;
            this.sumTotalPrice(this.userCart);
          });
        }
      },
      (err) => alert(err.message)
    );
  }
  public makeNewCart(id) {
    console.log("making new cart...")
    this.cartService.makeCart(id).subscribe(
      (newCart) => {
        this.revealCart(newCart[0]);
        return;
      },
      (err) => alert(err.message)
    );
  }
  public sumTotalPrice(cart) {
    // console.table('cart?', cart);
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].totalPrice;
    }
    //console.log(sum);
    this.totalPrice = sum;
  }
  public revealCart(newCart) {
    console.table('newCart:', newCart);
  }
  public cartTime(time) {
    this.cartDate = time;
  }
  public resize() {
    this.size = !this.size;
  }
}
