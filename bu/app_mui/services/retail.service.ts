import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../components/models/Products-model';
import { CategoryModel } from '../components/models/Category-model';
import { HttpClient } from '@angular/common/http';
const port = 3000;

@Injectable({
  providedIn: 'root'
})
export class RetailService {
  public api = `http://localhost:${port}/api/products/`;
  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.api);
  }
  public getAllcats(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.api + 'cats');
  }


}