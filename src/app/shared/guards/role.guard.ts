import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import decode from 'jwt-decode';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data['expectedRole'];
    const token = typeof localStorage.getItem('token') == 'undefined' ? localStorage.getItem('token') : '';
    // decode the token to get its payload
    if(token != null){
      const tokenPayload: any = decode(token);
      if (
        !this.auth.isAuthenticated() || 
        tokenPayload.role !== expectedRole
      ) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    } else{
      return false;
    }
  }
}