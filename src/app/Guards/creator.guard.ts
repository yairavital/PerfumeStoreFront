import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { usersService } from '../Services/users.service';

@Injectable({ providedIn: 'root' })
export class CreatorGuard implements CanActivate {
  constructor(private usersService: usersService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let result: boolean = true;
    if (!this.usersService.checkAdminLogin()) {
      this.router.navigate(['/home']).then((_) => {
        result = false;
        alert('You are not authorized ');
      });
    }

    return result;
  }
}
