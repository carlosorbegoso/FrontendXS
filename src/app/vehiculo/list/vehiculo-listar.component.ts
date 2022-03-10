import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { TokenService } from 'src/app/service/token.service';
import { VehiculoService } from 'src/app/service/vehiculo.service';
import { Utils } from 'src/app/utils/utils.service';

@Component({
	selector: 'app-vehiculo-listar',
	templateUrl: './vehiculo-listar.component.html',
	styleUrls: ['./vehiculo-listar.component.css']
})
export class VehiculoListarComponent implements OnInit {

	vehiculos: Vehiculo[] = [];
	roles: string[];
	isAdmin = false;
	page = 0;
	size = 10;
	order = 'vehCodigo';
	offset: number;
	asc = true;
	isFirst = false;
	isLast = false;
	estado = 'activo';
	errMsj: string;
	constructor(
		private serviceVehiculo: VehiculoService,
		private tokenService: TokenService,
		private util: Utils,
		private router: Router

	) { }

	ngOnInit(): void {
		//   console.log(this.vehiculos)
		this.roles = this.tokenService.getAuthorities();
		this.roles.forEach(rol => {
			if (rol === 'ROLE_ADMIN')
				this.isAdmin = true
		});
		this.listarVehiculos();
	}

	listarVehiculos() {
		this.serviceVehiculo.vehiculoListar(this.estado, this.page, this.size, this.order, this.asc).subscribe(
			(data: any) => {
				this.vehiculos = data.content;
				this.isFirst = data.isFirst;
				this.isLast = data.isLast;
				this.offset = data.pageable.offset;

				console.log(this.vehiculos)
			}, err => {
				if (err.error === null) {
					this.tokenService.logOut();
					this.router.navigate(['/login'])
				}
				this.errMsj = err.error.mensaje || err.error.mesaje;
				this.util.MensajeError(this.errMsj);
			}

		)
	}
	sort(): void {
		this.asc = !this.asc;
		this.listarVehiculos();
	}

	rewind(): void {
		if (!this.isFirst) {
			this.page--;
			this.listarVehiculos();
		}
	}
	forward(): void {
		if (!this.isLast) {
			this.page++;
			this.listarVehiculos();
		}
	}
	nuevo() {

	}


}
