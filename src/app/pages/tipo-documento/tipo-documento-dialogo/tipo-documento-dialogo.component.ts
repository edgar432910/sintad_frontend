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
        nombre            :[this.tipoDocumento.nombre , [Validators.required,Validators.maxLength(50)]],
        descripcion       :[this.tipoDocumento.descripcion , [Validators.required,Validators.maxLength(100)]],
        estado            :[this.tipoDocumento.estado , [Validators.required]]
      })
      
    }else{
      this.titulo = "Registrar"

      //REGISTRAR

     this.form= this.fb.group({
        idTipoDocumento   :[0],
        codigo            :[ , [Validators.required]],
        nombre            :[ , [Validators.required]],
        descripcion       :[ , [Validators.required]],
        estado            :["false" , [Validators.required]]

      })
     
    }

  }

  
  operar() {
    if(this.form?.invalid){
      this.form.markAllAsTouched();
      return;
    }
    
    this.form.value['estado']  = this.form.value['estado']?1:0;
   
    if (this.tipoDocumento != null && this.tipoDocumento.idTipoDocumento > 0) {
     

      //MODIFICAR
      this.tipoDocumentoService.modificar(this.form.value).pipe(switchMap( ()=> {
        return this.tipoDocumentoService.listar();
      }))
      .subscribe(data => {
        this.tipoDocumentoService.setTipoDocumentoCambio(data);
        this.tipoDocumentoService.setMensajeCambio('SE MODIFICO');
      });
    }else{
      //REGISTRAR
      this.tipoDocumentoService.registrar(this.form.value).pipe(switchMap( ()=> {
        return this.tipoDocumentoService.listar();
      }))      
      .subscribe(data => {
        this.tipoDocumentoService.setTipoDocumentoCambio(data);
        this.tipoDocumentoService.setMensajeCambio('SE REGISTRO');
      });
    }
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();    
  }
}
