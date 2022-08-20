import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { TipoDocumento } from '../../../_model/tipoDocumento';
import { TipoDocumentoService } from '../../../_service/tipo-documento.service';

@Component({
  selector: 'app-tipo-documento-dialogo',
  templateUrl: './tipo-documento-dialogo.component.html',
  styleUrls: ['./tipo-documento-dialogo.component.css']
})
export class TipoDocumentoDialogoComponent implements OnInit {
  tipoDocumento:TipoDocumento;
  form:FormGroup;
  titulo:string;
  error:string;

    constructor(   private dialogRef: MatDialogRef<TipoDocumentoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TipoDocumento,
    private tipoDocumentoService: TipoDocumentoService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
   

    this.tipoDocumento={...this.data};
    if (this.tipoDocumento != null && this.tipoDocumento.idTipoDocumento > 0) {
      this.titulo = "Editar"
      //MODIFICAR
     this.form= this.fb.group({
        idTipoDocumento   :[this.tipoDocumento.idTipoDocumento],
        codigo            :[this.tipoDocumento.codigo , [Validators.required,Validators.maxLength(20)]],
        nombre            :[this.tipoDocumento.nombre , [Validators.required,Validators.maxLength(100)]],
        descripcion       :[this.tipoDocumento.descripcion, [Validators.maxLength(200)]],
        estado            :[this.tipoDocumento.estado , [Validators.required]]
      })
      
    }else{
      this.titulo = "Registrar"

      //REGISTRAR

     this.form= this.fb.group({
        idTipoDocumento   :[0],
        codigo            :[ , [Validators.required,Validators.maxLength(20)]],
        nombre            :[ , [Validators.required,Validators.maxLength(100)]],
        descripcion       :[ , [Validators.maxLength(200)]],
        estado            :["false" , [Validators.required]]

      })
     
    }

  }

  
  operar() {
    if(this.form?.invalid){
      this.form.markAllAsTouched();
      return;
    }
    
    this.form.value['estado']  = this.form.value['estado']?true:false;
   
    if (this.tipoDocumento != null && this.tipoDocumento.idTipoDocumento > 0) {
     

      //MODIFICAR
      this.tipoDocumentoService.modificar(this.form.value).pipe(switchMap( ()=> {
        return this.tipoDocumentoService.listar();
      }))
    
      .subscribe({
        next:data => {
            this.tipoDocumentoService.setTipoDocumentoCambio(data);
          this.tipoDocumentoService.setMensajeCambio('SE MODIFICO');
        },
        error:err =>{
          this.error = err.error.mensaje;
        }
      });

    }else{
      //REGISTRAR
      this.tipoDocumentoService.registrar(this.form.value).pipe(switchMap( ()=> {
        return this.tipoDocumentoService.listar();
      }))      
      .subscribe({
        next:data => {
            this.tipoDocumentoService.setTipoDocumentoCambio(data);
          this.tipoDocumentoService.setMensajeCambio('SE REGISTRO');
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
