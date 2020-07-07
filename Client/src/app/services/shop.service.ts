import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/Products-model';
import { CategoryModel } from '../models/Category-model';
const port = 3000;
@Injectable({ providedIn: 'root' })
export class ShopService {
  public api = `http://localhost:${port}/api/products/`;
  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.api);
  }
  public getOneProductAsync(id: number): Promise<ProductModel> {
    return this.http.get<ProductModel>(this.api + 'item/' + id).toPromise();
  }
  public getAllcats(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.api + 'cats');
  }

  public addOneProductAsync(productForm: any): Observable<any> {
    return this.http.post<any>(
      this.api + 'add-product',
      productForm
      //  {headers: this.getHeaders()}
    );
  }
}
