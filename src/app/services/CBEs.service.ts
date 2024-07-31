import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Response from '../models/response';
import CBEs from '../models/CBEs';
import { baseURL } from '../baseURL';

@Injectable({
  providedIn: 'root',
})
export class CBEsService {
  private token = localStorage.getItem('Token');

  constructor(private httpClient: HttpClient) {}
  public SelecetOption = '';

  post(cbe: CBEs) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.httpClient.post<Response>(`${baseURL}/api/CBEs`, cbe, {
      headers,
    });
  }

  getAll() {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.get<Response>(`${baseURL}/api/CBEs`, { headers });
  }

  getById(id: number) {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.get<Response>(`${baseURL}/api/CBEs/${id}`, {
      headers,
    });
  }

  getCBEsInBin() {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.get<Response>(`${baseURL}/api/CBEs/bin`, {
      headers,
    });
  }

  cancelDeleted(id: number) {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.put<Response>(
      `${baseURL}/api/CBEs/bin/CancelDelete/${id}`,
      { headers }
    );
  }

  delete(id: number) {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.delete<Response>(`${baseURL}/api/CBEs/${id}`, {
      headers,
    });
  }

  lastDelete(id: number) {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.delete<Response>(
      `${baseURL}/api/CBEs/bin/LastDelete/${id}`,
      { headers }
    );
  }

  getHistory(id: number) {
    const token = localStorage.getItem('Token'); // Replace 'token' with your actual token key in LocalStorage
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); // Use Bearer token
    return this.httpClient.get<Response>(`${baseURL}/api/CBEs/history/${id}`, {
      headers,
    });
  }

  put(cbe: CBEs) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.httpClient.put<Response>(`${baseURL}/api/CBEs/UpdateCBE`, cbe, {
      headers,
    });
  }

  putMaturity(cbe: CBEs) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);
    return this.httpClient.put<Response>(
      `${baseURL}/api/CBEs/UpdateMaturity`,
      cbe,
      {
        headers,
      }
    );
  }
}
