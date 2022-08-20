import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { TipoContribuyente } from '../../../_model/tipoContribuyente';
import { TipoContribuyenteService } from '../../../_service/tipo-contribuyente.service';

@Component({
  selector: 'app-tipo-contribuyente-dialogo',
  templateUrl: './tipo-contribuyente-dialogo.component.html',
  styleUrls: ['./tipo-contribuyente-dialogo.component.css']
})
export class TipoContribuyenteDialogoComponent implements OnInit {
  tipoContribuyente:TipoContribuyente;
  form:FormGroup;
  error:string;
  titulo:string;

    constructor(   private dialogRef: MatDialogRef<TipoContribuyenteDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TipoContribuyente,
    private tipoContribuyenteService: TipoContribuyenteService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
   

    this.tipoContribuyente={...this.data};
    if (this.tipoContribuyente != null && this.tipoContribuyente.idTipoContribuyente > 0) {

      this.titulo= "Editar"
      //MODIFICAR
     this.form= this.fb.group({
         idTipoContribuyente      :[this.tipoContribuyente.idTipoContribuyente],
         nombre         :[this.tipoContribuyente.nombre , [Validators.required,Validators.maxLength(50)]],
         estado    :[this.tipoContribuyente.estado , [Validators.required]]

      })
      
    }else{
      this.titulo = "Crear"
      //REGISTRAR
     this.form= this.fb.group({
        idTipoContribuyente   :[0],
        nombre      :[ , [Validators.required,Validators.maxLength(50)]],
        estado    :["false" , [Validators.required]]
      })
     
    }

  }

  
  operar() {
    if(this.form?.invalid){
      this.form.markAllAsTouched();
      return;
    }
    
    this.form.value['estado']  = this.form.value['estado']?true:false;
   
    if (this.tipoContribuyente != null && this.tipoContribuyente.idTipoContribuyente > 0) {
     

      //MODIFICAR
      this.tipoContribuyenteService.modificar(this.form.value).pipe(switchMap( ()=> {
        return this.tipoContribuyenteService.listar();
      }))
      // .subscribe(data => {
      //   this.tipoContribuyenteService.setTipoContribuyenteCambio(data);
      //   this.tipoContribuyenteService.setMensajeCambio('SE MODIFICO');
      // });
      .subscribe({
        next:data => {
          this.tipoContribuyenteService.setTipoContribuyenteCambio(data);
          this.tipoContribuyenteService.setMensajeCambio('SE MODIFICO');
        },
        error:err =>{
          this.error = err.error.mensaje;
        }
      });
    }else{
      //REGISTRAR
      this.tipoContribuyenteService.registrar(this.form.value).pipe(switchMap( ()=> {
        return this.tipoContribuyenteService.listar();
      }))      
      // .subscribe(data => {
      //   this.tipoContribuyenteService.setTipoContribuyenteCambio(data);
      //   this.tipoContribuyenteService.setMensajeCambio('SE REGISTRO');
      // });
      .subscribe({
        next:data => {
          this.tipoContribuyenteService.setTipoContribuyenteCambio(data);
          this.tipoContribuyenteService.setMensajeCambio('SE REGISTRO');
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
