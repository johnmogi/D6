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
}
