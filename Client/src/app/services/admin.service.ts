import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthModel } from '../models/Auth-model';
import { ProductModel } from '../models/Products-model';

const port = 3000;
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public api = `http://localhost:${port}/api/admin/`;

  constructor(private http: HttpClient) {}

  public editItem(product: {}): Observable<any> {
    return this.http.patch<AuthModel>(this.api + 'update-item', product);
  }

  public addImage(productForm: any) {
    return this.http.post<any>(this.api + 'add-image', productForm);
  }
  public addItem(productForm: any) {
    return this.http.post<any>(this.api + 'add-product', productForm);
  }
}
