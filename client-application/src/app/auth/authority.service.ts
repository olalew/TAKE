import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthorityService {

  private isUserAuthenticate = false;
  private userRole = '';

  constructor() { }

  private checkAuthentication(): boolean {
    const accessToken = window.sessionStorage.getItem('accessToken');
    return (accessToken !== null && accessToken !== undefined && accessToken !== '') ?? false;
  }

  setToken(token: string, expirationDate: string): void {
    window.sessionStorage.setItem('accessToken', token);
    window.sessionStorage.setItem('expirationDate', expirationDate);
  }

  getToken(): string {
    return window.sessionStorage.getItem('accessToken')!;
  }

  setUserAuthenticate(auth: boolean): void {
    this.isUserAuthenticate = auth;
  }

  getUserAuthenticate(): boolean {
    this.setUserAuthenticate(this.checkAuthentication());
    return this.isUserAuthenticate;
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string {
    this.setUserRole(window.sessionStorage.getItem('role')!);
    return this.userRole;
  }

}
