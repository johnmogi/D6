import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { store } from 'src/app/redux/store';
import { AuthModel } from 'src/app/models/Auth-model';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [],
})

export class CartComponent implements OnInit {

  public user = new AuthModel();
  public userCart = [];
  public userCartItems = [];

  public cartLoad = false;
  public cartBox = '';
  public totalPrice = 0;
  constructor(
    private userService: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    store.subscribe(() => {
      // call cart and items:
      this.user = store.getState().user; // * -user ready - get active cart:
      if (this.user && !this.user.isAdmin && !this.cartLoad) {
       

          this.fetchCart(this.user.userID);

      }

    });
    if (this.userCartItems.length < 1) {
      this.cartLoad = false;
      this.userCart = [];
      this.cartBox = 'Start filling up your cart by adding items...';
    }

    if (this.userCartItems.length > 0) {
      this.cartLoad = true;
      this.cartBox =
        'you left an un-saved cart... here are your previous items';
      this.sumTotalPrice(this.userCartItems);
    }
  }

  public removeItem(id) {
    window.location.reload();
    this.cartService
      .removeItemFromCart(id, this.userCart[0].cartID)
      .subscribe((res) => console.log(res));
  }

  public sumTotalPrice(cart) {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].totalPrice;
    }
    this.totalPrice = sum;
  }
  public fetchCart(id) {
    this.cartLoad = true;

    this.cartService.findCart(id).subscribe(
      (res) => {
        this.userCart[0] = res[0];

        this.fetchCartItems(res[0].cartID);

      },
      (err) => err.message
    );


  }
  public fetchCartItems(id) {


    this.cartService.fetchItems(id).subscribe(
      (res) => {
        this.userCartItems = res;
        console.table('empty cart:' + JSON.stringify(this.userCartItems));
        //   console.table('cart:' + JSON.stringify(this.userCartItems));
      },
      (err) => err.message
    );

  }
}