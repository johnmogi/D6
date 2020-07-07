import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CartModel } from '../components/models/Cart-model';
import { CartItemModel } from '../components/models/Cart-Item-model';
import { HttpClient } from '@angular/common/http';


const port = 3000;


@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  public makeCart(userID: Number): Observable<CartModel[]> {
    return this.http.post<CartModel[]>(`http://localhost:${port}/api/cart/new/${userID}`, "")
  }

  public findCart(id: Number): Observable<CartModel[]> {
    return this.http.get<CartModel[]>(`http://localhost:${port}/api/cart/user/${id}`)
  }
  public fetchItems(num): Observable<CartItemModel[]> {
    return this.http.get<CartItemModel[]>(`http://localhost:${port}/api/cart/history/${num}`)
  }
  // add item to cart
  public addItemToCart(sendInfo, cartID): Observable<CartItemModel[]> {
    console.table("service", sendInfo)
    return this.http.post<CartItemModel[]>(`http://localhost:${port}/api/cart/add-item/${cartID}`, sendInfo)
  }
  public removeItemFromCart(productID, cartID): Observable<CartItemModel[]> {
    return this.http.delete<CartItemModel[]>(`http://localhost:${port}/api/cart/drop/${cartID}/${productID}`)
  }
}
