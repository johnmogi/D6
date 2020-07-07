import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {CartService} from 'src/app/services/cart.service';
import {Router} from '@angular/router';
import {store} from 'src/app/redux/store';
import {AuthModel} from 'src/app/models/Auth-model';
import {OrderModel} from 'src/app/models/Order-model';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {OrderService} from 'src/app/services/order.service';

@Component({selector: 'app-checkout', templateUrl: './checkout.component.html', styles: []})
export class CheckoutComponent implements OnInit {
    public user = new AuthModel();
    public userID = 0;
    public userCart = [];
    public userCartItems = [];
    public calendar = [1, 3, 15]
    public cartBox = '';
    public totalPrice = 0;
    public order = new OrderModel();
    public orders=[];
    public occupiedDates=[];
    public orderForm = this.order;
    public searchTerm = [];
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
    constructor(private userService : AuthService, private orderService : OrderService, private cartService : CartService, private router : Router) {}
    dateClass = (d : Date): MatCalendarCellCssClasses => {
        const date = d.getDate();
        return(date === 1 || date === 20) ? 'example-custom-date-class' : ''; // replace with occupied dates
    }
    ngOnInit() {
        store.subscribe(() => {
            this.user = store.getState().user; // * -user ready - get active cart:
                    this.orders = store.getState().orders;
               
               for (let i = 0; i < this.orders.length; i++) {
                this.occupiedDates.push(this.orders[i].shippingDate)
                   
               }
                console.log("oc_orders: " + JSON.stringify(this.occupiedDates))
              
               //     this.occupiedDates = this.orders
                
            if (this.user && !this.user.isAdmin) {
                this.userID = + this.user.userID
                this.fetchCart(this.user.userID);
            }
            this.userCart = store.getState().cartItems;

        });
        this.userCart = store.getState().cartItems;
        this.occupiedDates = store.getState().orders;

    }
    // public removeItem(id) {
    //     console.log(id)
    // }

    public async fetchCart(id) {
        await this.cartService.findCart(id).subscribe((res) => {
            this.userCart[0] = res[0];
            this.fetchCartItems(res[0].cartID);
        }, (err) => err.message);


    }
    public async fetchCartItems(id) {
        await this.cartService.fetchItems(id).subscribe((res) => {
            this.userCartItems = res;
            this.sumTotalPrice(res)
            // console.table('empty cart:' + JSON.stringify(this.userCartItems));
            // console.table('cart:' + JSON.stringify(this.userCartItems));
        }, (err) => err.message);
    }

    public sumTotalPrice(cart) {

        console.log(cart)
        let sum = 0;
        for (let i = 0; i < cart.length; i++) {
            sum += cart[i].totalPrice;
        }
        this.totalPrice = sum;
    }
    public search(searchTerm) {
        console.log(searchTerm)
        // this.userCartItems = this.products;
        // const selected = this.products.filter((product) => product.itemName === this.searchTerm.term.toLowerCase());
        // this.activeProducts = selected;
    }
    public completeOrder() {
        if (!this.orderForm.paymentDigits || !this.orderForm.shippingDate || !this.orderForm.shippingCity) {
            return alert("one of the fields is empty, make sure to fill out all..")
        }


        this.orderForm.cartID = this.userCart[0].cartID
        this.orderForm.clientID = this.userID
        this.orderForm.subTotal = + this.totalPrice
        console.log(this.orderForm)
        this.orderService.addOrder(this.orderForm).subscribe((res) => {

            alert("you have successfully purchased the items," + res)
this.makeCart();
this.downloadReceipt()

           // make a new cart for the user, keep a refernce for the old cart just take order info (store?)

            // console.table('empty cart:' + JSON.stringify(this.userCartItems));
            // console.table('cart:' + JSON.stringify(this.userCartItems));
        }, (err) => err.message);
    }

    public makeCart(){
// keeping old cart for billing purposes- but could also archive or delete it... and **{items}**... 
this.cartService.makeCart(this.userID).subscribe((res) => {
  console.log("made a new, empty cart for user" + res[0].cartID)
}, (err) => err.message);
    
    }
    public downloadReceipt(){
console.log("save as txt file from server")
    }
}
