import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  constructor(
    // private toastr: ToastrService
    ){}
    MensajeError(mensaje: string){
      alert(mensaje);
        // this.toastr.error(mensaje, 'Error', {
        //     timeOut: 3000,  positionClass: 'toast-bottom-right',
        // });
    }
    MensajeExito(mensaje: string){
      alert(mensaje);
        // this.toastr.success(mensaje, 'OK', {
        //     timeOut: 3000,  positionClass: 'toast-top-center',
        // });
    }
}
