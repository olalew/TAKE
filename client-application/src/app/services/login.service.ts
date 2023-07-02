import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api-url.model';
import { UserLogin } from '../entitites/user-login.model';

export type EntityResponseType = HttpResponse<string>;

@Injectable({providedIn: 'root'})
export class LoginService {

  private url = API_URL + 'public/login'

  constructor(
    private http: HttpClient
  ) { }

  login(user: UserLogin): Observable<EntityResponseType> {
    return this.http.post<string>(this.url, {email: user.email, password: user.password}, {observe: 'response'});
  }

}
