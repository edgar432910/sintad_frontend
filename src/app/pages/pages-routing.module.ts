import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../_service/guard.service';
import { EntidadComponent } from './entidad/entidad.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { TipoContribuyenteComponent } from './tipo-contribuyente/tipo-contribuyente.component';



export const routes: Routes = [
 
 
  {
    path: 'entidad', component: EntidadComponent, 
    canActivate:[GuardService]

  },
  {
    path: 'tipoDocumento', component: TipoDocumentoComponent, 
    canActivate:[GuardService]
  },
  
  {
    path: 'tipoContribuyente', component: TipoContribuyenteComponent, 
    canActivate:[GuardService]
  },
  {
    path: '',redirectTo:'entidad', pathMatch:'full' 

  },

  
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PagesRoutingModule{}