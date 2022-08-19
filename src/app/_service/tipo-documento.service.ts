import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoDocumento } from '../_model/tipoDocumento';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService  extends GenericService<TipoDocumento>{

  TipoDocumentoCambio: Subject<TipoDocumento[]> = new Subject<TipoDocumento[]>();
  mensajeCambio: Subject<string> = new Subject<string>();
  constructor(protected override http:HttpClient) {
    super(
      http,`${environment.HOST}/tipoDocumento`
    );
  }

  
  getTipoDocumentoCambio(){
    return this.TipoDocumentoCambio.asObservable();
  }

  setTipoDocumentoCambio(TipoDocumento: TipoDocumento[]){
    this.TipoDocumentoCambio.next(TipoDocumento);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

}
