import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { AuthModel } from 'src/app/models/Auth-model';
import { OrderModel } from 'src/app/models/Order-model';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent implements OnInit {
  public calendar = [1,3,15]
public userCart = [];
public cartBox = '';
public totalPrice = 0;
public order = new OrderModel();
public orderForm = this.order
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
constructor(private userService : AuthService, private cartService : CartService, private router : Router) {}
dateClass = (d: Date): MatCalendarCellCssClasses => {
  const date = d.getDate();

  // Highlight the 1st and 20th day of each month.
  return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
}
ngOnInit() {
    store.subscribe(() => {
        this.userCart = store.getState().cartItems;
       // console.table('price:' + JSON.stringify(this.userCart));
    });
this.userCart = store.getState().cartItems;



  }
public removeItem(id){
  console.log(id)
}
public completeOrder(){
  console.log(this.orderForm)
}
}