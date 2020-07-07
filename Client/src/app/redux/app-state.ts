import { AuthModel } from '../models/Auth-model';
import { CartItemModel } from '../models/Cart-Item-model';
import { ProductModel } from '../models/Products-model';
import { CategoryModel } from '../models/Category-model';
import { CartModel } from '../models/Cart-model';
import { OrderModel } from '../models/Order-model';

export class AppState {
  public user: AuthModel;
  public products: ProductModel[];
  public cart: CartModel[];
  public cartItems: CartItemModel[];
  public cats: CategoryModel[];
  public orders: OrderModel[];

  // public userIslogged: boolean;
  // public totalPrice: number;
  // public cartOption: boolean;

  public constructor() {
    this.user = null;
    this.products = [];
    this.cart = [];
    this.cartItems = [];
    this.orders = [];
    this.cats = [];
    // this.userIslogged = false;

    // this.totalPrice = 0;
    // this.cartOption = false;
  }
}
