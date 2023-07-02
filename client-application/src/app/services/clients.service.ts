import { Injectable } from '@angular/core';
import { API_URL } from '../config/api-url.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../entitites/client.model';

export type EntityArrayResponseType = HttpResponse<Client[]>;

@Injectable({providedIn: 'root'})
export class ClientsService {

  private url = API_URL + 'client'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<EntityArrayResponseType> {
    return this.http.get<Client[]>(this.url, {observe: 'response'});
  }

  getAllNotDeleted(): Observable<EntityArrayResponseType> {
    return this.http.get<Client[]>(this.url + '/getAllNotDeletedClients', {observe: 'response'});
  }

  create(client: Client): Observable<HttpResponse<void>> {
    return this.http.post<HttpResponse<void>>(this.url, client);
  }

  update(client: Client): Observable<HttpResponse<void>> {
    return this.http.put<HttpResponse<void>>(this.url, client);
  }

  delete(clientId: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(`${this.url}/${clientId}`);
  }
}
