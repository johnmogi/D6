import { Component, OnInit } from '@angular/core';
import { AuthModel } from 'src/app/models/Auth-model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  public user = new AuthModel();
  public upUser = new AuthModel();
  public loginForm = this.user;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    store.subscribe(() => {
      this.upUser = store.getState().user;
    });

    //* RE-login user to avoid LOGOUT after refresh :
    this.upUser = store.getState().user;
    if (localStorage.token) {
      this.authService.liveUser().subscribe(
        (res) => {
          if (res.name === 'JsonWebTokenError') {
            return;
          }
          const action = { type: ActionType.userLogin, payload: res.user };
          store.dispatch(action);
        },
        (err) => alert(err.message)
      );
    }
  }

  public login() {
    if (!this.loginForm.username_email || !this.loginForm.password) {
      return alert('a field is missing- try again');
    }
    this.authService.loginUser(this.loginForm).subscribe(
      (res) => {
        if (!res.user) {
          alert('Wrong email / password .');
          return;
        }

        const action = { type: ActionType.userLogin, payload: res.user };
        store.dispatch(action);
        localStorage.setItem('token', res.jwtToken); //cookie?
        if (res.user) {
          this.increaseVisits(res.user);
          this.router.navigateByUrl('/shop');
        }
        if (res.user.isAdmin) {
          this.router.navigateByUrl('/admin');
        }
      },
      (err) => alert(err.message)
    );
  }
  public increaseVisits(res) {
    const userID = JSON.stringify(res.userID);
    this.authService.visitUp(userID).subscribe(
      () => {
        //  console.log(JSON.stringify(answer));
      },

      (err) => alert(err.message)
    );
  }
}
