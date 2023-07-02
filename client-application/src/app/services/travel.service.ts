import { Injectable } from '@angular/core';
import { API_URL } from '../config/api-url.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Travel } from '../entitites/travel.model';
 
export type EntityArrayResponseType = HttpResponse<Travel[]>;
 
@Injectable({providedIn: 'root'})
export class TravelService {
 
  private url = API_URL + 'transport'
 
  constructor(
    private http: HttpClient
  ) { }
 
  getAll(): Observable<EntityArrayResponseType> {
    return this.http.get<Travel[]>(this.url, {observe: 'response'});
  }
 
  getAllNotDeleted(): Observable<EntityArrayResponseType> {
    return this.http.get<Travel[]>(this.url + '/getAllNotDeletedTravel', {observe: 'response'});
  }
 
  getForClient(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<Travel[]>(this.url + `/${id}`, {observe: 'response'});
  }
 
  create(travel: Travel): Observable<HttpResponse<void>> {
    return this.http.post<HttpResponse<void>>(this.url, travel);
  }
 
  update(travel: Travel): Observable<HttpResponse<void>> {
    return this.http.put<HttpResponse<void>>(this.url, travel);
  }
 
  delete(travelId: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(`${this.url}/${travelId}`);
  }
}