import {Component, OnInit} from '@angular/core';
import {ProductModel} from 'src/app/models/Products-model';
import {Router, ActivatedRoute} from '@angular/router';
import {store} from 'src/app/redux/store';
import {ShopService} from 'src/app/services/shop.service';
import {CartService} from 'src/app/services/cart.service';
import {CartModel} from 'src/app/models/Cart-model';
import {CartItemModel} from 'src/app/models/Cart-Item-model';
import {ActionType} from 'src/app/redux/action-type';
import {AuthModel} from 'src/app/models/Auth-model';

@Component({selector: 'app-item', templateUrl: './item.component.html', styleUrls: ['./item.css']})
export class ItemComponent implements OnInit {
    public user = new AuthModel();
    public product = new ProductModel();
    public productID?: Number;
    public name : String = '';
    public price : Number = 0;
    public imageUrl : String = '';
    public itemDescription : String = '';
    public catID : String = '';
    public newCart : CartModel = new CartModel();
    public userCart = [];
    public userCartItems = [];
                public addItem = {
                    amount: 1,
                    productID: '',
                    cartId: 0
                };


    constructor(private myActivatedRoute : ActivatedRoute, private shopService : ShopService, private cartService : CartService, private router : Router) {}
    async ngOnInit() {
        try {
            const id = + this.myActivatedRoute.snapshot.params.id;
            store.subscribe(() => {
                this.user = store.getState().user;
                this.userCart = store.getState().cart;
                if (this.user) {
                    this.fetchCart(this.user.userID);
                }
            });
            this.userCart = store.getState().cart;
            this.user = store.getState().user;

            // * Fetch this item details:
            this.product = await this.shopService.getOneProductAsync(id);
            this.productID = this.product[0].productID;
            this.name = this.product[0].itemName;
            this.price = this.product[0].price;
            this.imageUrl = this.product[0].imageUrl;
            this.itemDescription = this.product[0].itemDescription;
            this.catID = this.product[0].catID;
        } catch (err) {
            alert(err.message);
        }
    }

    public addToCart(productID) { // setting default amount to 1 (UX):
//     console.table('user: ' + JSON.stringify(this.user.userID));
this.fetchCart(this.user.userID);
        this.addItem.cartId = + this.userCart[0].cartID;
        this.addItem.productID = productID;
        this.cartService.addItemToCart(this.addItem, this.addItem.cartId).subscribe((res) => {
            const action = {
                type: ActionType.addItemCart,
                payload: res
            };
            store.dispatch(action);
            alert("item has been added, Thank you")
            // window.location.reload(); // deprercated
            this.router.navigateByUrl('/shop');

        }, (err) => alert(err.message));
    }
    public fetchCart(id) {
        this.cartService.findCart(id).subscribe((res) => {
            this.userCart[0] = res[0];
         //   this.fetchCartItems(res[0].cartID);
        }, (err) => err.message);
    }
  
}
