import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    // Usuario logueado
    let rpta = this.loginService.estaLogueado();
    if (!rpta) {
      this.loginService.cerrarSesion();
      this.router.navigate(['/login']);
      return false;
    }

    // verificar token no expirado

    const helper = new JwtHelperService();
    let token = localStorage.getItem(environment.TOKEN_NAME);
    if (!helper.isTokenExpired(token)) {
       
        let url = state.url;
        
        const decodedToken = helper.decodeToken(token);
        return true;
          
      
     
        
    } else{
      this.loginService.cerrarSesion();
      this.router.navigate(['/login']);

      return false;
    }


  }


}
