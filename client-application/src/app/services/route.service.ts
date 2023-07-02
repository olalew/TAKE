import { Injectable } from '@angular/core';
import { API_URL } from '../config/api-url.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelRoute } from 'src/app/entitites/travel-route.model';

export type EntityArrayResponseType = HttpResponse<TravelRoute[]>;

@Injectable({providedIn: 'root'})
export class RouteService {

  private url = API_URL + 'route'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<EntityArrayResponseType> {
    return this.http.get<TravelRoute[]>(this.url, {observe: 'response'});
  }

  getAllNotDeleted(): Observable<EntityArrayResponseType> {
    return this.http.get<TravelRoute[]>(this.url + '/getAllNotDeletedRoute', {observe: 'response'});
  }

  create(route: TravelRoute): Observable<HttpResponse<void>> {
    return this.http.post<HttpResponse<void>>(this.url, route);
  }

  update(route: TravelRoute): Observable<HttpResponse<void>> {
    return this.http.put<HttpResponse<void>>(this.url, route);
  }

  delete(routeId: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(`${this.url}/${routeId}`);
  }
}
