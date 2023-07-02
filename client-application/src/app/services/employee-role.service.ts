import { Injectable } from '@angular/core';
import { API_URL } from '../config/api-url.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EmployeeRole } from '../entitites/employee-role.model';

export type EntityArrayResponseType = HttpResponse<EmployeeRole[]>;

@Injectable({providedIn: 'root'})
export class EmployeeRoleService {

  private url = API_URL + 'employeeRoles'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<EntityArrayResponseType> {
    return this.http.get<EmployeeRole[]>(this.url + '/getAllRoles', {observe: 'response'});
  }
}
