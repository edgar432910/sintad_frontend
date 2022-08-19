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
    console.log({rpta});
    if (!rpta) {
      this.loginService.cerrarSesion();
      this.router.navigate(['/login']);
      return false;
    }

    // verificar token no expirado

    const helper = new JwtHelperService();
    let token = localStorage.getItem(environment.TOKEN_NAME);
    if (!helper.isTokenExpired(token)) {
        // verificar si tienes el rol
        let url = state.url;
        console.log(url);
              const decodedToken = helper.decodeToken(token);
            return true;
              // return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((data:Menu[]) =>{
              //      this.menuService.setMenuCambio(data);

              //     let cont = 0;
              //     for (let m of data) {
              //       if (url.startsWith(m.url)) {
              //         cont++;
              //         break;
              //       }
              //     }
                
              //     if (cont > 0) {
              //       return true;
              //     } else {
              //       this.router.navigate(['/pages/not-403']);
              //       return false;
              //     }
              // }));
          
     
        
    } else{
      this.loginService.cerrarSesion();
      this.router.navigate(['/login']);

      return false;
    }


  }


}
