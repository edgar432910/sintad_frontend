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
    path: '',redirectTo:'login', pathMatch:'full' 

  },

 

  {
    path:'pages',
    component:LayoutComponent,
    loadChildren:()=> import('./pages/pages.module').then(m=> m.PagesModule)
  },
  { 
    path:'**', 
    redirectTo:"pages"
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }