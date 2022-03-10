import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ubigeo } from '../models/ubigeo';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  private apiUrl = `${environment.API_URL}/ubigeo/`;
  constructor(private http: HttpClient) {}

  listarDepartamento(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'departamentos');
  }

  listaProvincias(paramDep: any): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'provincias/' + paramDep);
  }

  listaDistritos(paramDep: any, paramProv: any): Observable<Ubigeo[]> {
    return this.http.get<Ubigeo[]>(this.apiUrl + 'distritos/' + paramDep + '/' + paramProv);
  }
}
