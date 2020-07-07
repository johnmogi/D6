import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthModel } from '../models/Auth-model';

const port = 3000;

@Injectable({ providedIn: 'root' })
export class AuthService {
  public api = `http://localhost:${port}/api/auth/`;

  constructor(private http: HttpClient) {}

  public checkUser(auth: {}): Observable<any> {
    return this.http.post<AuthModel>(this.api + 'check-user', auth);
  }

  public regUser(auth: {}): Observable<any> {
    return this.http.post<AuthModel>(this.api + 'register', auth);
  }

  public loginUser(sendInfo: object): Observable<any> {
    // alert(JSON.stringify(sendInfo));
    return this.http.post<any>(this.api + 'login', sendInfo);
  }
  public liveUser(): Observable<any> {
    return this.http.get<any>(this.api + 'keep-user', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
  public logoutUser(): Observable<any> {
    return this.http.post<any>(this.api + 'logout', '');
  }
}
