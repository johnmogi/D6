import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../components/models/Order-model';
import { HttpClient } from '@angular/common/http';

const port = 3000;


@Injectable({
  providedIn: 'root'
})
export class BillingService {

  public api = `http://localhost:${port}/api/orders/`;
  constructor(private http: HttpClient) {}


  public getAllorders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.api);
  }
}
