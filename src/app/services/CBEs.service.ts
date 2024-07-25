import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Response from '../models/response';
import CBEs from '../models/CBEs';

@Injectable({
  providedIn: 'root',
})
export class CBEsService {
  private readonly baseURL = 'http://192.168.1.8:8000/api/CBEs';
  private token = localStorage.getItem('Token');

  constructor(private httpClient: HttpClient) {}
  public SelecetOption = '';

  post(cbe: CBEs) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.httpClient.post<Response>(`${this.baseURL}`, cbe, { headers });
  }

  getAll() {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.get<Response>(`${this.baseURL}`, { headers });
  }

  getById(id: number) {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.get<Response>(`${this.baseURL}/${id}`, { headers });
  }

  getCBEsInBin() {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.get<Response>(`${this.baseURL}/bin`, { headers });
  }

  cancelDeleted(id: number) {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.put<Response>(
      `${this.baseURL}/bin/CancelDelete/${id}`,
      { headers }
    );
  }

  delete(id: number) {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.delete<Response>(`${this.baseURL}/${id}`, {
      headers,
    });
  }

  lastDelete(id: number) {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.delete<Response>(
      `${this.baseURL}/bin/LastDelete/${id}`,
      { headers }
    );
  }

  getHistory(id: number) {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.get<Response>(`${this.baseURL}/history/${id}`, {
      headers,
    });
  }
}
