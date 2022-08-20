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
  error:string;
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
         nroDocumento       :[this.entidad.nroDocumento , [Validators.required, Validators.maxLength(25)]],
         razonSocial        :[this.entidad.razonSocial , [Validators.required,  Validators.maxLength(100)]],
         nombreComercial    :[this.entidad.nombreComercial, [Validators.maxLength(100)] ],
         tipoContribuyente  :[this.entidad.tipoContribuyente.idTipoContribuyente , [Validators.required]],
         direccion          :[this.entidad.direccion , [Validators.required,  Validators.maxLength(250)]],
         telefono           :[this.entidad.telefono ,[Validators.maxLength(50)] ],
         estado    :[this.entidad.estado , [Validators.required]]
        })
      
    }else{
     this.titulo = "Crear"

      //REGISTRAR
     this.form= this.fb.group({
        idEntidad:[0],
        tipoDocumento      :[ , [Validators.required]],
        nroDocumento       :[ , [Validators.required,  Validators.maxLength(25)]],
        razonSocial        :[ , [Validators.required,  Validators.maxLength(100)]],
        nombreComercial    :[ , [Validators.maxLength(100)]],
        tipoContribuyente  :[ , [Validators.required]],
        direccion          :[ , [Validators.required ,  Validators.maxLength(250)]],
        telefono           :[ , [Validators.maxLength(50)]],
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
    this.form.value['estado']  = this.form.value['estado']?true:false;

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
      .subscribe({
        next:data => {
          this.entidadService.setEntidadCambio(data);
          this.entidadService.setMensajeCambio('SE MODIFICO');
        },
        error:err =>{
          this.error = err.error.mensaje;
        }
      });
      
    }else{
      //REGISTRAR
      this.entidadService.registrar(this.form.value).pipe(switchMap( ()=> {
        return this.entidadService.listar();
      }))      
      .subscribe({
        next:data => {
          this.entidadService.setEntidadCambio(data);
          this.entidadService.setMensajeCambio('SE REGISTRO');
        },
        error:err =>{
          this.error = err.error.mensaje;
        }
      });
    }
    if(this.error=== undefined){
      this.cerrar();
    }

  }

  cerrar() {
    this.dialogRef.close();    
  }

}
