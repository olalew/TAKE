import { inject, Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthorityService } from '../auth/authority.service';

@Injectable(
  {providedIn: 'root'}
)
export class UserRouteAccessService {

    constructor(private router: Router,
      private authorityService: AuthorityService
      ) {
    }

    // canActivate(authorities: string[] | null): Observable<boolean> {
    //   return this.accountService.get().pipe(
    //         map(account => {

    //             if (!authorities || authorities.length === 0 || this.hasAnyAuthority(authorities, account.body)) {
    //               return true;
    //             }

    //             if (isDevMode()) {
    //               console.error('User has not any of required authorities: ', authorities);
    //             }
    //             this.router.navigate(['']);
    //             return false;

    //           // //this.stateStorageService.storeUrl(state.url);
    //           // this.router.navigate(['/login']);
    //           // return false;
    //         }),
    //         catchError((error) => {
    //           this.router.navigate(['/login']);
    //           return of(false);
    //         })
    //       );
    // }

    hasAnyAuthority(authorities: string[] | string): Observable<boolean> {
      const userRole = this.authorityService.getUserRole();
      if (!userRole) {
        return of(false);
      }
      if (!Array.isArray(authorities)) {
        authorities = [authorities];
      }
      return of(authorities.some((authority: string) => authority.includes(userRole)));
    }
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const authService = inject(UserRouteAccessService);
  return authService.hasAnyAuthority(route.data['authorities']);
};
