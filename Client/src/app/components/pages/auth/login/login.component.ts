import { Component, OnInit } from '@angular/core';
import { AuthModel } from 'src/app/models/Auth-model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { CartItemModel } from 'src/app/models/Cart-Item-model';
import { CartModel } from 'src/app/models/Cart-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  public user = new AuthModel();
  public upUser = new AuthModel();

  public cart = new CartModel();
  public userCart = [];

  public loginForm = this.user;
  public ErrorMessage = '';
  public valid: Boolean = false;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    store.subscribe(() => {
      this.upUser = store.getState().user;
    });

    // * RE-login user to avoid LOGOUT after refresh :
    this.upUser = store.getState().user;
    if (localStorage.token) {
      this.authService.liveUser().subscribe(
        (res) => {
          if (res.name === 'JsonWebTokenError') {
            return;
          }
          const action = {
            type: ActionType.userLogin,
            payload: res.user,
          };
          store.dispatch(action);
        },
        (err) => alert(err.message)
      );
    }
  }

  public login(): void {
    if (!this.loginForm.username_email || !this.loginForm.password) {
      this.ErrorMessage = 'a field is missing- try again';
      return;
    }
    this.authService.loginUser(this.loginForm).subscribe(
      (res) => {
        if (!res.user) {
          alert('Wrong email / password .');
          return;
        }
        this.ErrorMessage = '';
        this.valid = !this.valid;
        const action = {
          type: ActionType.userLogin,
          payload: res.user,
        };
        store.dispatch(action);
        localStorage.setItem('token', res.jwtToken); // cookie?
        if (res.user) {
          this.checkForCart(res.user);
        }
        if (res.user.isAdmin) {
          this.router.navigateByUrl('/dashboard');
        }
      },
      (err) => alert(err.message)
    );
  }

  public checkForCart(user) {
    this.cartService.findCart(user.userID).subscribe(
      (res) => {
        this.userCart[0] = res[0];
      },
      () => this.makeNewCart(user.userID)
    ); // a bit hackey but solid ,maybe: try catch next time?
  }

  public makeNewCart(userID) {
    // new cart is born, no further action needed.
    this.cartService.makeCart(userID).subscribe(
      () => {},
      (err) => err.message
    );
  }
}
