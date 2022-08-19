import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entidad } from '../../../_model/entidad';
import { EntidadService } from '../../../_service/entidad.service';
import { TipoContribuyente } from '../../../_model/tipoContribuyente';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { TipoContribuyenteService } from 'src/app/_service/tipo-contribuyente.service';
import { TipoDocumentoService } from 'src/app/_service/tipo-documento.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-entidad-dialogo',
  templateUrl: './entidad-dialogo.component.html',
  styleUrls: ['./entidad-dialogo.component.css']
})
export class EntidadDialogoComponent implements OnInit {
  entidad:Entidad;
  form:FormGroup;
  tipoContribuyentes:TipoContribuyente[];
  tipoDocumentos:TipoDocumento[];
 
  titulo:string;



    constructor(   private dialogRef: MatDialogRef<EntidadDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Entidad,
    private entidadService: EntidadService,
    private fb:FormBuilder,
    private tipoContribuyenteService:TipoContribuyenteService,
    private tipoDocumentoService:TipoDocumentoService) { }

  ngOnInit(): void {
    this.tipoContribuyenteService.listar().subscribe(data=>{
      this.tipoContribuyentes = data;
    });
    this.tipoDocumentoService.listar().subscribe(data=>{
      this.tipoDocumentos = data;
    });

    this.entidad={...this.data};
    if (this.entidad != null && this.entidad.idEntidad > 0) {
     this.titulo= "Editar"
      //MODIFICAR
     this.form= this.fb.group({
         idEntidad:[this.entidad.idEntidad],
         tipoDocumento      :[this.entidad.tipoDocumento.idTipoDocumento , [Validators.required]],
         nroDocumento       :[this.entidad.nroDocumento , [Validators.required]],
         razonSocial        :[this.entidad.razonSocial , [Validators.required]],
         nombreComercial    :[this.entidad.nombreComercial , [Validators.required]],
         tipoContribuyente  :[this.entidad.tipoContribuyente.idTipoContribuyente , [Validators.required]],
         direccion          :[this.entidad.direccion , [Validators.required]],
         telefono           :[this.entidad.telefono , [Validators.required,Validators.maxLength(40)]],
         estado    :[this.entidad.estado , [Validators.required]]
        })
      
    }else{
     this.titulo = "Crear"

      //REGISTRAR
     this.form= this.fb.group({
        idEntidad:[0],
        tipoDocumento      :[ , [Validators.required]],
        nroDocumento       :[ , [Validators.required]],
        razonSocial        :[ , [Validators.required]],
        nombreComercial    :[ , [Validators.required]],
        tipoContribuyente  :[ , [Validators.required]],
        direccion          :[ , [Validators.required]],
        telefono           :[ , [Validators.required]],
        estado    :["false" , [Validators.required]]
     })
     
    }

  }

  
  operar() {
    if(this.form?.invalid){
      this.form.markAllAsTouched();
      return;
    }
    let tipoDocumento=new TipoDocumento();
    let tipoContribuyente=new TipoContribuyente();
    tipoDocumento.idTipoDocumento = this.form.value['tipoDocumento'];
    tipoContribuyente.idTipoContribuyente= this.form.value['tipoContribuyente'];
    this.form.value['tipoDocumento']      = tipoDocumento;
    this.form.value['tipoContribuyente']  = tipoContribuyente;
    this.form.value['estado']  = this.form.value['estado']?1:0;

    // let marcafinal=new Marca();
    // marcafinal.idMarca  =   this.form.value['id'];
    // marcafinal.estado   =   this.form.value['estado'];
    // marcafinal.orden    =   this.form.value['orden'];
    // marcafinal.nombre   =   this.form.value['nombre'];

   
    if (this.entidad != null && this.entidad.idEntidad > 0) {
     

      //MODIFICAR
      this.entidadService.modificar(this.form.value).pipe(switchMap( ()=> {
        return this.entidadService.listar();
      }))
      .subscribe(data => {
        this.entidadService.setEntidadCambio(data);
        this.entidadService.setMensajeCambio('SE MODIFICO');
      });
    }else{
      //REGISTRAR
      this.entidadService.registrar(this.form.value).pipe(switchMap( ()=> {
        return this.entidadService.listar();
      }))      
      .subscribe(data => {
        this.entidadService.setEntidadCambio(data);
        this.entidadService.setMensajeCambio('SE REGISTRO');
      });
    }
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();    
  }

}
