import { Component, OnInit } from '@angular/core';
import { AuthModel } from 'src/app/models/Auth-model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
public user = new AuthModel();
public addUser = {id: '', username_email: '', password: '', firstName: '', lastName: '', street: '', city : ''}
public confPass= "";
public validated0 = false;
public validated1 = false;
public errorBox = '';

  public errorMessages = {
    id: 'make sure to fill ID',
    idTaken: 'ID already exists',
    email: 'make sure to fill Email',
    emailTaken : 'Email already exists',
    passwords: 'make sure to fill password'

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
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  public checkValid(){
    if(!this.addUser.id || this.addUser.id.length <7 ){
      this.errorBox = this.errorMessages.id
      return false;

    }
    if(!this.addUser.username_email){
      this.errorBox = this.errorMessages.email
      return false;
    }
    if(!this.addUser.password || this.addUser.password.length <2){
      this.errorBox = this.errorMessages.passwords
      return false;
    }
    if(this.addUser.password != this.confPass){
      this.errorBox = "passwords do not match!"
      return this.validated0 = false;
    }
    else{
      this.validated0 = true;
    }
  }
public async checkUser(){
  this.checkValid();
  if(!this.validated0){
    this.errorBox = ""
    return}
  console.log(this.addUser)
  await this.authService.checkUser(this.addUser).subscribe(
    (res) => {
      console.log(res);
       alert(res.message)
      if (res.user) {
      // const action = { type: ActionType.userLogin, payload: res.user };
      // store.dispatch(action);
      this.validated1 = true;
      return 
    }
   
    this.validated1 = false;

    },
    (err) => alert(err.message)
  );
}

public signUp(){
  this.authService.regUser(this.addUser).subscribe(
    (res) => {
      console.log(res);
      const liveForm = { username_email :this.addUser.username_email, password : this.addUser.password}
     this.liveLogin(liveForm)
    },
    (err) => alert(err.message)
  );
}
// need to delay response here, user does not auto- connect
public liveLogin(liveForm){
  this.authService.loginUser(liveForm).subscribe(
    (response) => {
      console.log(response);
      this.router.navigateByUrl('/');
    },
    (err) => alert(err.message)
  );
}
}
