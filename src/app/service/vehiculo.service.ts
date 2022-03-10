import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class VehiculoService {
	private apiUrl = `${environment.API_URL}/vehiculo/`;

	constructor(private HttpClient: HttpClient) { }

	public vehiculoListar(estado: string, page: number, size: number, order: string, asc: boolean) {
		let httpParams = new HttpParams(
			{
				fromObject: {
					page: page,
					estado: estado,
					order: order,
					asc: asc
				}
			}
		)
		return this.HttpClient.post(this.apiUrl + 'listar',
			httpParams.toString(),
			{
				headers: new HttpHeaders()
					.set('Content-Type', 'application/x-www-form-urlencoded')
			}
		);
	}

}
