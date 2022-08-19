import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Entidad } from '../../_model/entidad';
import { EntidadService } from '../../_service/entidad.service';
import { EntidadDialogoComponent } from './entidad-dialogo/entidad-dialogo.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {
  dataSource:MatTableDataSource<Entidad>;
  displayedColumns: string[] = ['idEntidad','tipoDocumento', 'nroDocumento', 'razonSocial',
                                'nombreComercial','tipoContribuyente','direccion','telefono', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSortHeader) sort: MatSort;
  constructor(private entidadService: EntidadService, private snackBar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit(): void {

    this.entidadService.entidadCambio.subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      // this.dataSource.sort=this.sort;
    });
    this.entidadService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data, 'Aviso', {duration:20000});
    });
    this.entidadService.listar().subscribe(data=>{
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

  crearTabla(data: Entidad[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  abrirDialogo(entidad?: Entidad) {
    this.dialog.open(EntidadDialogoComponent, {
      width: '490px',
      data: entidad,
      disableClose:true
    });
  }

  eliminar(entidad: Entidad) {
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
        this.entidadService.eliminar(entidad.idEntidad).pipe(switchMap( ()=> {
          return this.entidadService.listar();
        }))      
        .subscribe(data => {
          this.entidadService.setEntidadCambio(data);
          this.entidadService.setMensajeCambio('SE ELIMINO');
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
