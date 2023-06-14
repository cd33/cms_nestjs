// import { Injectable } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service';

// function checkAdmin(authService: AuthService, router: Router): CanActivateFn {
//   if (authService.isAdmin) {
//     return true;
//   }
//   router.navigate(['/']);
//   return false;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminGuard {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate: [checkAdmin(this.authService, this.router)];
// }

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree => {
    if (this.authService.isAdmin) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  };
}
