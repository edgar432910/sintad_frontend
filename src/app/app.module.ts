import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntidadComponent } from './pages/entidad/entidad.component';
import { TipoDocumentoComponent } from './pages/tipo-documento/tipo-documento.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { EntidadDialogoComponent } from './pages/entidad/entidad-dialogo/entidad-dialogo.component';
import { TipoDocumentoDialogoComponent } from './pages/tipo-documento/tipo-documento-dialogo/tipo-documento-dialogo.component';
import { TipoContribuyenteDialogoComponent } from './pages/tipo-contribuyente/tipo-contribuyente-dialogo/tipo-contribuyente-dialogo.component';
import { TipoContribuyenteComponent } from './pages/tipo-contribuyente/tipo-contribuyente.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContainerComponent } from './shared/components/container/container.component';
import { TitleComponent } from './shared/components/title/title.component';
import { LayoutComponent } from './pages/layout/layout.component';

export function tokenGetter() {
  return localStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    EntidadComponent,
    EntidadDialogoComponent,
    TipoDocumentoComponent,
    TipoDocumentoDialogoComponent,
    TipoContribuyenteComponent,
    TipoContribuyenteDialogoComponent,
    LoginComponent,
    ContainerComponent,
    TitleComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.HOST2.substring(7)],
        disallowedRoutes: [`${environment.HOST2}/login/enviarCorreo`]
      },
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
