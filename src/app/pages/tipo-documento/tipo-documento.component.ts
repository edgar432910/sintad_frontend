import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoDocumento } from '../../_model/tipoDocumento';
import { TipoDocumentoService } from '../../_service/tipo-documento.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { TipoDocumentoDialogoComponent } from './tipo-documento-dialogo/tipo-documento-dialogo.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortHeader, MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {
  dataSource:MatTableDataSource<TipoDocumento>;
  displayedColumns: string[] = ['idTipoDocumento','codigo','nombre','descripcion', 'acciones'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSortHeader) sort: MatSort;
  constructor(private tipoDocumentoService: TipoDocumentoService, private snackBar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit(): void {

    this.tipoDocumentoService.TipoDocumentoCambio.subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      // this.dataSource.sort=this.sort;
    });
    this.tipoDocumentoService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data, 'Aviso', {duration:20000});
    });
    this.tipoDocumentoService.listar().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
    
      this.dataSource.paginator=this.paginator;
      // this.dataSource.sort=this.sort;
    });
  }

  
  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
    /*this.dataSource.filterPredicate = (data: Paciente, filter: string) => {
      return data.nombres.toLowerCase().includes(filter) || data.apellidos.toLowerCase().includes(filter);
    }})*/
  }

  crearTabla(data: TipoDocumento[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  abrirDialogo(tipoDocumento?: TipoDocumento) {
    this.dialog.open(TipoDocumentoDialogoComponent, {
      width: '490px',
      data: tipoDocumento,
      disableClose:true

    });
  }

  eliminar(tipoDocumento: TipoDocumento) {
    Swal.fire({
      title: 'ESTAS SEGURO?',
      text: "SE ELIMINARA PERMANENTE",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'QUIERO ELIMINARLO'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoDocumentoService.eliminar(tipoDocumento.idTipoDocumento).pipe(switchMap( ()=> {
          return this.tipoDocumentoService.listar();
        }))      
        .subscribe(data => {
          this.tipoDocumentoService.setTipoDocumentoCambio(data);
          this.tipoDocumentoService.setMensajeCambio('SE ELIMINO');
        });
        Swal.fire(
          'ELIMINADO',
          'ESTUDIANTE ELIMINADO',
          'success'
        )
      }
    })

    
  }

}
