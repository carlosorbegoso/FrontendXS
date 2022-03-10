import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { Utils } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-create',
  templateUrl: './login-create.component.html',
  styleUrls: ['./login-create.component.css']
})
export class LoginCreateComponent implements OnInit {

  	isDisabled: boolean = true;
	isRegister: boolean = false;
	isRegisterFail: boolean = false;
	nuevoUsuario: NuevoUsuario;
	nombre: string;
	nombreUsuario: string;
	email: string;
	password: string;
	authorities: string[] = [];
	errMsj: string;
	isLogged: boolean = false;
	roles:String;
	

	constructor(
		private tokenService: TokenService,
		private authService: AuthService,
		private router: Router,
		private util: Utils,

	) { }

	ngOnInit(): void {
		if (this.tokenService.getToken()) {
			this.isLogged = true;
			this.authorities = this.tokenService.getAuthorities();
		}
	}
	Nuevo(): void {
		this.isDisabled = false
		this.Limpiar();

	}
	onRegister(): void { 
		this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password,this.roles);
		this.authService.nuevo(this.nuevoUsuario).subscribe(
			data => {
				this.util.MensajeExito('Usuario' + data.nombreUsuario + " Guardado exitosamente");
				this.Limpiar();
				this.isDisabled = true;
			},
			err => {
				if (err.error === null) {
					this.tokenService.logOut();
					this.router.navigate(['/login'])
				  }
				  this.errMsj = err.error.mensaje || err.error.mesaje;
				  this.util.MensajeError(this.errMsj);
			}
		)
	}

	Limpiar(){
		this.nombre					='';
		this.nombreUsuario			= '';
		this.email					= '';
		this.password				= '';
		this.roles				 	= '';

	}

}
