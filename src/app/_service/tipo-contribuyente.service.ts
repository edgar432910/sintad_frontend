import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoContribuyente } from '../_model/tipoContribuyente';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TipoContribuyenteService extends GenericService<TipoContribuyente>{

  TipoContribuyenteCambio: Subject<TipoContribuyente[]> = new Subject<TipoContribuyente[]>();
  mensajeCambio: Subject<string> = new Subject<string>();
  constructor(protected override http:HttpClient) {
    super(
      http,`${environment.HOST}/tipoContribuyente`
    );
  }

  
  getTipoContribuyenteCambio(){
    return this.TipoContribuyenteCambio.asObservable();
  }

  setTipoContribuyenteCambio(TipoContribuyente: TipoContribuyente[]){
    this.TipoContribuyenteCambio.next(TipoContribuyente);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }



}

