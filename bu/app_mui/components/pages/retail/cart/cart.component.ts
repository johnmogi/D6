import { Component, OnInit } from '@angular/core';
import { AuthModel } from 'src/app/components/models/Auth-model';
import { CartItemModel } from 'src/app/components/models/Cart-Item-model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { store } from 'src/app/components/redux/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [],
})
export class CartComponent implements OnInit {
  public user = new AuthModel();
  public userCart = [];
  public cartItems = new CartItemModel();
  constructor(
    private userService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    store.subscribe(() => {
      this.user = store.getState().user;
      if (this.user && !this.user.isAdmin) {
        this.saveCart(+this.user.userID);
      }
    });
    this.user = store.getState().user;
  }

  // store does not load user ):
  public async saveCart(id: Number) {
    //  console.log(id); //24

    this.cartService.findCart(id).subscribe(
      (res) => {
        // console.log(res); //1
        if (res.length > 0) {
          //  console.log("you have a cart:" + res[0].cartID)
          this.cartService.fetchItems(res[0].cartID).subscribe((response) => {
            this.userCart = response;
            //   console.table(response) // cart
            sessionStorage.setItem('cart', JSON.stringify(response));
          });
        }
        // if(res.length>0){console.log(res[0].cartID);}
      },
      (err) => alert(err.message)
    );
  }
  public getItems(cart) {
    
    // this.cartService.
  }
}
