import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/components/models/Auth-model';
import { store } from 'src/app/components/redux/store';
import { ActionType } from 'src/app/components/redux/action-type';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
public user = new AuthModel();
public upUser = new AuthModel();
public loginForm = this.user;

public email = new FormControl('', [Validators.required, Validators.email]);
public ErrorMessage = ''
public valid : Boolean = false;
getErrorMessage() {
  if (this.email.hasError('required')) {
    return 'You must enter a value';
  }
  return this.email.hasError('email') ? 'Not a valid email' : '';
}

constructor(private authService: AuthService, 
  private router: Router) {}

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

  public login(): void {
    if(!this.loginForm.username_email || !this.loginForm.password){
      // return alert("a field is missing- try againa field is missing- try again")
       this.ErrorMessage = 'a field is missing- try again'
       return
    }
    this.authService.loginUser(this.loginForm).subscribe(
      (res) => {
        if (!res.user) {
          alert('Wrong email / password .');
          return;
        }
        this.ErrorMessage = ''
        this.valid = !this.valid
        const action = { type: ActionType.userLogin, payload: res.user };
        store.dispatch(action);
        localStorage.setItem('token', res.jwtToken); //cookie?
        if (res.user) {
          this.router.navigateByUrl('/shop');
        }
        if (res.user.isAdmin) {
          this.router.navigateByUrl('/admin');
        }
      },
      (err) => alert(err.message)
    );

  }

}
