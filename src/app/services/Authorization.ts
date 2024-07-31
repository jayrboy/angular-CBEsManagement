import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Response from '../models/response';
import CBEsUser from '../models/CBEsUser';
import { Observable } from 'rxjs';
import { baseURL } from '../baseURL';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private accessToken = localStorage.getItem('Bearer');
  private tokenType = `Bearer ${this.accessToken}`;

  constructor(private httpClient: HttpClient) {}

  Login(login: CBEsUser): Observable<Response> {
    const url = `${baseURL}/api/Authorization/Login`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      username: login.username,
      password: login.password,
    };

    return this.httpClient.post<Response>(url, body, { headers });
  }
}
