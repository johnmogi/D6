import { Component, OnInit } from '@angular/core';
import { RegAuthModel } from 'src/app/models/Auth-model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent implements OnInit {
  public user = new RegAuthModel();
  public regUser = {
    id: '',
    username_email: '',
    password: '',
    conf_password: '',
  };

  public sendForm = this.user;
  public firstStepValid = false;
  public secondStepValid = false;

  public errorbox = '';
  public errorMessages = {
    id: 'make sure to fill ID',
    email: 'make sure to fill Email',
    passwords: 'make sure to fill password',
    passwordsMatch: 'passwords do not match, try again...',
  };
  public cities = [
    'Metula',
    'Haifa',
    'Hadera',
    'Pardes-Hanna',
    'Byniamina',
    'Zichron',
    'Hertzelia',
    'Tel-Aviv',
    'Jerusalem',
    'Beer-Sheva',
    'Eilat',
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  public checkValid() {
    console.log(this.user);

    if (this.user.password != this.user.conf_password) {
      this.errorbox = this.errorMessages.passwordsMatch;

      return;
    }
    if (
      !this.user.id ||
      !this.user.username_email ||
      !this.user.password ||
      !this.user.conf_password
    ) {
      this.errorbox = 'make sure you fill all fields';

      return;
    } else {
    }
    // this.errorbox = '';
    this.firstStepValid = true;
    return;
  }

  public checkUser() {
    this.checkValid();

    this.authService.checkUser(this.user).subscribe((res) => {
      this.errorbox = res.message;
      console.log(res);
      if (res.message.email) {
        this.errorbox = res.message;
      }
      if (res.message.id) {
        this.errorbox = res.message;
      }

      if (res.user) {
        this.firstStepValid = true;

        return;
      }
    });
    return;
  }

  public addUser() {
    this.authService.addUser(this.sendForm).subscribe(
      (response) => {
        alert('you have completed the registration : ' + response);
        //live User
        this.authService.liveUser().subscribe(
          (res) => {
            const action = { type: ActionType.userLogin, payload: res.user };
            store.dispatch(action);
          },
          (err) => alert(err.message)
        );
        this.router.navigateByUrl('/');
      },
      (err) => alert(err.message)
    );
  }
}
