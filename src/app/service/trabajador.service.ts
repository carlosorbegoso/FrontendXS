import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Trabajador } from '../models/trabajador';
@Injectable({
	providedIn: 'root'
})
export class TrabajadorService {
	private apiUrl = `${environment.API_URL}/trabajador/`;
	constructor(private HttpClient: HttpClient) { }

	public trabajadorListar(estado: string, page: number, size: number, order: string, asc: boolean) {
		// let httpParams = new HttpParams();
		// httpParams.set('page', page);
		// httpParams.set('estado', estado);
		// httpParams.set('order', order);
		// httpParams.set('asc', asc);
		let httpParams = new HttpParams(
			{
				fromObject: {
					page: page,
					estado: estado,
					order: order,
					asc: asc
				}
			}
		);

		return this.HttpClient.post(this.apiUrl + 'listar',
			httpParams.toString(),
			{
				headers: new HttpHeaders()
					.set('Content-Type', 'application/x-www-form-urlencoded')
			}
		);

	}

	/*	public trabajadorNuevo(trabajadorNuevo:Trabajador):Observable<any>{
			let httpParams = new HttpParams();
		
			Object.keys(trabajadorNuevo).forEach(function(key) {
				httpParams = httpParams.append(key, trabajadorNuevo[key]);
				httpParams.set("cargo",trabajadorNuevo.cargo.cargoId)
				// httpParams = httpParams.set()
				// httpParams = httpParams.append(key, trabajadorNuevo[key]);
			});
			Object.keys(trabajadorNuevo.cargo).forEach(function(key) {
				httpParams = httpParams.append(key, trabajadorNuevo[key]);
	
				// httpParams = httpParams.set()
				// httpParams = httpParams.append(key, trabajadorNuevo[key]);
			})
			
			return this.HttpClient.post<any>(this.apiUrl+ 'nuevo',
			httpParams.toString(),
			{
				headers: new HttpHeaders()
				  .set('Content-Type', 'application/x-www-form-urlencoded')
			  }
			)
	
		}*/

	public trabajadorRegistrar(trabajadorNuevo: Trabajador): Observable<any> {
		return this.HttpClient.post<any>(this.apiUrl + 'registrar', trabajadorNuevo);

	}
	public trabajadorActualizar(trabajadorNuevo: Trabajador): Observable<any> {
		return this.HttpClient.put<any>(this.apiUrl + 'actualizar', trabajadorNuevo);
	}

	public getTrabajadorId(id: number) {
		let httpParams = new HttpParams(
			{
				fromObject: {
					id: id
				}
			}
		);
		return this.HttpClient.post<any>(this.apiUrl + 'id',
			httpParams.toString(),
			{
				headers: new HttpHeaders()
					.set('Content-Type', 'application/x-www-form-urlencoded')
			}
		);
	}


}  
