import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private apiUrl = `${environment.API_URL}/cargo/`;
  constructor(private HttpClient: HttpClient) {}

  public cargoListar(): Observable<any> {
    return this.HttpClient.get(this.apiUrl+'listar')
  }

}
