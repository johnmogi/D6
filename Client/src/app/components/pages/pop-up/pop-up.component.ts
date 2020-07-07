import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/Products-model';
import { CartModel } from 'src/app/models/Cart-model';
import { CartItemModel } from 'src/app/models/Cart-Item-model';
import { store } from 'src/app/redux/store';
import { ShopService } from 'src/app/services/shop.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styles: [
  ]
})
export class PopUpComponent implements OnInit {
  public product = new ProductModel();
  public productID?: Number;
  public name : String = '';
  public price : Number = 0;
  public imageUrl : String = '';
  public itemDescription : String = '';
  public catID : String = '';
  public addItem = {
      amount: 1,
      productID: '',
      cartId: 0
  };

  public newCart : CartModel = new CartModel();
  public cart : CartModel[] = []; // try to init cart here before add to cart....
  public getCart : CartItemModel[] = [];
  // public product: ProductModel[] =[];
  // public product: ProductModel = new ProductModel();
  constructor(
   private shopService : ShopService, private cartService : CartService, private router : Router) {}
 
  async ngOnInit() {
    try {
        const id = + this.productID;
        store.subscribe(() => { 
            this.getCart = store.getState().cartItems;
            // console.table('cart nginit: ' + JSON.stringify(this.getCart));
          });
          this.getCart = store.getState().cartItems;
          
          
          
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
      
      public addToCart(id) { // setting default amount to 1 (UX):
        this.addItem.cartId = +this.getCart[0].cartID;
        
    this.addItem.productID = id;
    // console.table('cart: ' + JSON.stringify(this.addItem));
    this.cartService.addItemToCart(this.addItem, this.addItem.cartId).subscribe((res) => {
        // const action = {
        //     type: ActionType.addItemCart,
        //     payload: res
        // };
        // store.dispatch(action);
        alert("item has been added, Thank you")
        window.location.reload();
        // this.router.navigateByUrl('/shop');

    }, (err) => alert(err.message));
}
}
