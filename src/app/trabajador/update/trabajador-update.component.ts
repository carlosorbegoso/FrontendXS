import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { Trabajador } from 'src/app/models/trabajador';
import { TrabajadorService } from 'src/app/service/trabajador.service';
import { Utils } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-trabajador-update',
  templateUrl: './trabajador-update.component.html',
  styleUrls: ['./trabajador-update.component.css']
})
export class TrabajadorUpdateComponent implements OnInit {
  cargos: Cargo;
  trabajadores:Trabajador ={
    
  }
  isDisabled: boolean = true;
  
  constructor(
    private trabajadorService: TrabajadorService,
    private util: Utils,
    private router: Router,
   ) { }

  ngOnInit() {
   this.Editar();
   console.log(this.trabajadores)
  }
 
  Editar(){
    let id = localStorage.getItem('id');
    this.trabajadorService.getTrabajadorId(parseInt(id)).subscribe(data => {
      for (var t in data) {
        this.trabajadores = data[t]
        console.log(data[t]);
      }
      
    })
  }
  actualizar = 'actualizar';
  IngresarActualizar(value){
    console.log(value);
    if (value == "actualizar") {
      this.Actualizar();
    }
  }
  Actualizar(){
    alert("Actualizar")
  }
}
