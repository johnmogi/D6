import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/Order-model';
const port = 3000;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public api = `http://localhost:${port}/api/orders/`;
  constructor(private http: HttpClient) {}

  public getAllorders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.api);
  }
  public getOneOrderAsync(id: Number): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.api + 'item/' + id);
  }
  public getOneUserOrderAsync(userID: Number): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.api + 'user/' + userID);
  }

  public addOrder(orderForm: any, shipTime: String) {
    return this.http.post<any>(this.api + 'new', {
      form: orderForm,
      shipTime: shipTime,
    });
  }
}
