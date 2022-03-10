import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { interceptorProvider } from './interceptor/trab-interceptor.service';

//login
import { LoginCreateComponent } from './auth/create/login-create.component';
import { LoginComponent } from './auth/login/login.component';
import { IndexComponent } from './index/index.component';
//menu
import { MenuComponent } from './menu/menu.component';
// trabjador
import { TrabajadorListarComponent } from './trabajador/list/trabajador-listar.component';
import { TrabajadorCreateComponent } from './trabajador/create/trabajador-create.component';
import { TrabajadorUpdateComponent } from './trabajador/update/trabajador-update.component';
import { VehiculoCreateComponent } from './vehiculo/create/vehiculo-create.component';
import { VehiculoListarComponent } from './vehiculo/list/vehiculo-listar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    MenuComponent,
    LoginCreateComponent,
    TrabajadorListarComponent,
    TrabajadorCreateComponent,
    TrabajadorUpdateComponent,
    VehiculoCreateComponent,
    VehiculoListarComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule, 
    // ToastrModule.forRoot({
    //   timeOut: 10000,
    //   preventDuplicates: true,
    // }),
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
