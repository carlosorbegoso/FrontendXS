import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabGuardService as guard } from './guards/trab-guard.service';

//login
import { LoginCreateComponent} from './auth/create/login-create.component';
import { LoginComponent } from './auth/login/login.component';
//index
import { IndexComponent } from './index/index.component';

//trabajador
import { TrabajadorCreateComponent } from './trabajador/create/trabajador-create.component';
import { TrabajadorListarComponent } from './trabajador/list/trabajador-listar.component';
import { TrabajadorUpdateComponent } from './trabajador/update/trabajador-update.component';
//vehiculo
import { VehiculoListarComponent } from './vehiculo/list/vehiculo-listar.component';


const routes: Routes = 
[
  {path: '',component:IndexComponent},
  {path:'login',component:LoginComponent},
  {path:'usuario/registrar',component:LoginCreateComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path:'trabajador/registrar',component:TrabajadorCreateComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path:'trabajador/listar',component:TrabajadorListarComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path:'trabajador/actualizar',component:TrabajadorCreateComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path:'vehiculo/listar',component:VehiculoListarComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
