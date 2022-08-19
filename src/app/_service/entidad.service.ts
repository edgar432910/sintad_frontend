import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Entidad } from '../_model/entidad';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntidadService extends GenericService<Entidad>{

  entidadCambio: Subject<Entidad[]> = new Subject<Entidad[]>();
  mensajeCambio: Subject<string> = new Subject<string>();
  
  constructor(protected override http:HttpClient) {
    super(
      http,`${environment.HOST}/entidad`
    );
  }

  
  getEntidadCambio(){
    return this.entidadCambio.asObservable();
  }

  setEntidadCambio(Entidad: Entidad[]){
    this.entidadCambio.next(Entidad);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }




}
