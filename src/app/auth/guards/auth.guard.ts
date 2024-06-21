import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatch, CanMatchFn, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {

  constructor( private authService: AuthService, private router: Router) { }

  private checkAuthStatus(): boolean | Observable<boolean>{
    return this.authService.checkAuthentication()
    .pipe(
      tap(isAuthenticaded => console.log('isAuthenticated',isAuthenticaded)),
      tap( isAuthenticated => {
        if (!isAuthenticated) this.router.navigate(['./auth/login'])
      })
    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Observable<boolean>{

      return this.checkAuthStatus();

  }
  canMatch(route: Route, segments: UrlSegment[]):boolean | Observable<boolean>{
    return this.checkAuthStatus();
  }


}
