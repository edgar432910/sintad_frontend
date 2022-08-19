import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { TipoContribuyente } from '../../_model/tipoContribuyente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TipoContribuyenteService } from '../../_service/tipo-contribuyente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TipoContribuyenteDialogoComponent } from './tipo-contribuyente-dialogo/tipo-contribuyente-dialogo.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-tipo-contribuyente',
  templateUrl: './tipo-contribuyente.component.html',
  styleUrls: ['./tipo-contribuyente.component.css']
})
export class TipoContribuyenteComponent implements OnInit {
  dataSource:MatTableDataSource<TipoContribuyente>;
  displayedColumns: string[] = ['idTipoContribuyente','nombre', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSortHeader) sort: MatSort;
  constructor(private tipoContribuyenteService: TipoContribuyenteService, private snackBar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit(): void {

    this.tipoContribuyenteService.TipoContribuyenteCambio.subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      // this.dataSource.sort=this.sort;
    });
    this.tipoContribuyenteService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data, 'Aviso', {duration:20000});
    });
    this.tipoContribuyenteService.listar().subscribe(data=>{
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

  crearTabla(data: TipoContribuyente[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  abrirDialogo(tipoContribuyente?: TipoContribuyente) {
    this.dialog.open(TipoContribuyenteDialogoComponent, {
      width: '490px',
      data: tipoContribuyente,
      disableClose:true

    });
  }

  eliminar(tipoContribuyente: TipoContribuyente) {
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
        this.tipoContribuyenteService.eliminar(tipoContribuyente.idTipoContribuyente).pipe(switchMap( ()=> {
          return this.tipoContribuyenteService.listar();
        }))      
        .subscribe(data => {
          this.tipoContribuyenteService.setTipoContribuyenteCambio(data);
          this.tipoContribuyenteService.setMensajeCambio('SE ELIMINO');
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
