import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST2}/login`
  

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(usuario: string, contrasena: string){
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }

  estaLogueado() {
    let token = localStorage.getItem(environment.TOKEN_NAME);
    
    return token != null;
  }

  cerrarSesion(){
  
    let token = localStorage.getItem(environment.TOKEN_NAME);
    this.http.get(`${environment.HOST2}/tokens/anular/${token}`).subscribe(() => {
      localStorage.clear();
      this.router.navigate(['login']);
    });    
  }
}
