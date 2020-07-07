import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthModel } from 'src/app/components/models/Auth-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public user = new AuthModel();
public validated1 = false;
  public errorMessages = {
    id: 'make sure to fill ID',
    idTaken: '',
    email: 'make sure to fill Email',
    emailTaken : '',
    passwords: 'make sure to fill password',
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



  constructor(private _formBuilder: FormBuilder, private authService:AuthService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  public checkUser(){
    console.table("chckusr:", this.user)
    if(this.user.username_email){

      this.validated1 = true;
    }

    this.authService.checkUser(this.user).subscribe((res) => {
      console.log(res);
      if (res.message.email) {
        this.errorMessages.emailTaken = res.message;
      }
      // if (res.message.id) {
      //   this.errorbox = res.message;
      // }
      if (res.user) {
        this.validated1 = true;

        return;
      }
    });
    
    console.log(this.user)
  }
}
