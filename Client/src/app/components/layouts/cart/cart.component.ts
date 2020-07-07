import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { store } from 'src/app/redux/store';
import { AuthModel } from 'src/app/models/Auth-model';
import {
  trigger,
  style,
  query,
  stagger,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(100, [animate('0.5s', style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
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
  ) {}

  async ngOnInit() {
    store.subscribe(() => {
      // call cart and items:
      this.user = store.getState().user; // * -user ready - get active cart:
      if (this.user && !this.user.isAdmin && !this.cartLoad) {
        this.fetchCart(this.user.userID);
      }
    });
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
  public async fetchCart(id) {
    this.cartLoad = true;

    await this.cartService.findCart(id).subscribe(
      (res) => {
        this.userCart[0] = res[0];
        if (!res[0].cartID) {
          alert(
            'sorry for the inconvinience, late bug found- please refresh the page- it will surely fix it.'
          );
        }
        this.fetchCartItems(res[0].cartID);
      },
      (err) => err.message
    );
  }
  public async fetchCartItems(id) {
    await this.cartService.fetchItems(id).subscribe(
      (res) => {
        this.userCartItems = res;
        this.sumTotalPrice(res);
      },
      (err) => err.message
    );
  }
}
