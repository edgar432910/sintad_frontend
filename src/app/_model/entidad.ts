import { TipoContribuyente } from "./tipoContribuyente";
import { TipoDocumento } from "./tipoDocumento";


export class Entidad{
    idEntidad:number;
    tipoContribuyente:TipoContribuyente;
    tipoDocumento:TipoDocumento;
    nombreComercial:string;
    nroDocumento:string;
    razonSocial:string;
    direccion:string;
    telefono:string;
    estado:string;


}