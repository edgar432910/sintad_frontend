import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EntidadComponent } from './pages/entidad/entidad.component';
import { TipoDocumentoComponent } from './pages/tipo-documento/tipo-documento.component';
import { TipoContribuyenteComponent } from './pages/tipo-contribuyente/tipo-contribuyente.component';
import { LoginComponent } from './pages/login/login.component';
import { GuardService } from './_service/guard.service';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  
  {
    path: 'login', component: LoginComponent, 

  },
  {
    path: 'layout', component: LayoutComponent, 

  },

  {
    path: '',redirectTo:'login', pathMatch:'full' 

  },
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

  // {
  //   path:'pages',
  //   component:EntidadComponent,
  //   loadChildren:()=> import('./pages/pages.module').then(m=> m.PagesModule)
  // }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }