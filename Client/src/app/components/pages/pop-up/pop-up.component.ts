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
  styles: [],
})
export class PopUpComponent implements OnInit {
  public product = new ProductModel();
  public productID?: Number;
  public name: String = '';
  public price: Number = 0;
  public imageUrl: String = '';
  public itemDescription: String = '';
  public catID: String = '';
  public addItem = {
    amount: 1,
    productID: '',
    cartId: 0,
  };

  public newCart: CartModel = new CartModel();
  public cart: CartModel[] = []; // try to init cart here before add to cart....
  public getCart: CartItemModel[] = [];

  constructor(
    private shopService: ShopService,
    private cartService: CartService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const id = +this.productID;
      store.subscribe(() => {
        this.getCart = store.getState().cartItems;
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

  public addToCart(id) {
    this.addItem.cartId = +this.getCart[0].cartID;

    this.addItem.productID = id;
    this.cartService.addItemToCart(this.addItem, this.addItem.cartId).subscribe(
      (res) => {
        alert('item has been added, Thank you');
        window.location.reload();
      },
      (err) => alert(err.message)
    );
  }
}
