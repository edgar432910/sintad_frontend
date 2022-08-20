import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntidadComponent } from './entidad/entidad.component';
import { EntidadDialogoComponent } from './entidad/entidad-dialogo/entidad-dialogo.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { TipoDocumentoDialogoComponent } from './tipo-documento/tipo-documento-dialogo/tipo-documento-dialogo.component';
import { TipoContribuyenteComponent } from './tipo-contribuyente/tipo-contribuyente.component';
import { TipoContribuyenteDialogoComponent } from './tipo-contribuyente/tipo-contribuyente-dialogo/tipo-contribuyente-dialogo.component';
import { TitleComponent } from '../shared/components/title/title.component';



@NgModule({
  declarations: [
    EntidadComponent,
    EntidadDialogoComponent,
    TipoDocumentoComponent,
    TipoDocumentoDialogoComponent,
    TipoContribuyenteComponent,
    TipoContribuyenteDialogoComponent,
    
    TitleComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PagesRoutingModule,
    FlexLayoutModule
  ]
})
export class PagesModule { }
