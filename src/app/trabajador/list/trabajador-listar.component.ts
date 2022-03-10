import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { Trabajador } from 'src/app/models/trabajador';
import { Ubigeo } from 'src/app/models/ubigeo';
import { TokenService } from 'src/app/service/token.service';
import { TrabajadorService } from 'src/app/service/trabajador.service';
import { UbigeoService } from 'src/app/service/ubigeo.service';
import { Utils } from 'src/app/utils/utils.service';

@Component({
	selector: 'app-trabajador-listar',
	templateUrl: './trabajador-listar.component.html',
	styleUrls: ['./trabajador-listar.component.css']
})
export class TrabajadorListarComponent implements OnInit {

	trabajadores: Trabajador[] = [];
	cargo: Cargo = {
		cargoId: 1,
		cargoNombre: ''
	}
	// trabajador: Trabajador;
	// provincias: string[] = [];;
	// distritos: Ubigeo[] = [];;

	roles: string[];
	isAdmin = false;
	page = 0;
	size = 10;
	order = 'trabCodigo';
	offset: number;
	asc = true;
	isFirst = false;
	isLast = false;
	estado = 'activo';
	errMsj: string;

	constructor(
		private service: TrabajadorService,
		private tokenService: TokenService,
		private util: Utils,
		private router: Router,
		private ubigeoService: UbigeoService
	) {}

	ngOnInit(): void {

		this.cargarTrabajador();
		this.roles = this.tokenService.getAuthorities();
		this.roles.forEach(rol => {
			if (rol === 'ROLE_ADMIN')
				this.isAdmin = true
		});
	}
	buscarTrabajador(t: Trabajador) {
		localStorage.setItem("estado", "actualizar");
		localStorage.setItem('id', t.trabId.toString());
		localStorage.setItem('departamento', t.ubigeo?.departamento)
		localStorage.setItem('provincia', t.ubigeo?.provincia)
		this.router.navigate(["/trabajador/actualizar"]);
	}
	Nuevo() {
		localStorage.setItem("estado", "registrar");
		this.router.navigate(["/trabajador/registrar"]);

	}

	cargarTrabajador() {
		this.service.trabajadorListar(this.estado, this.page, this.size, this.order, this.asc).subscribe(
			(data: any) => {
				this.trabajadores = data.content;
				this.isFirst = data.first;
				this.isLast = data.last;
				this.offset = data.pageable.offset;
			}, err => {
				// console.log(err);
				if (err.error === null) {
					this.tokenService.logOut();
					this.router.navigate(['/login'])
				}
				this.errMsj = err.error.mensaje || err.error.mesaje;
				this.util.MensajeError(this.errMsj);
			}
			// console.log(error), () => console.log("complete")

		);
	}
	sort(): void {
		this.asc = !this.asc;
		this.cargarTrabajador();
	}

	rewind(): void {
		if (!this.isFirst) {
			this.page--;
			this.cargarTrabajador();
		}
	}
	forward(): void {
		if (!this.isLast) {
			this.page++;
			this.cargarTrabajador();
		}
	}


}
