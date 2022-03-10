import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class TrabInterceptorService  implements HttpInterceptor{ 

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReg = req;
    const token = this.tokenService.getToken();
    if(token != null){
      intReg = req.clone({headers:req.headers.set('Authorization','Bearer '+token)})
    }
    return next.handle(intReg);
  }
}
export const interceptorProvider = [{provide:HTTP_INTERCEPTORS,useClass:TrabInterceptorService,multi:true}]
