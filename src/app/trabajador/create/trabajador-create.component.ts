import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { Trabajador } from 'src/app/models/trabajador';
import { Ubigeo } from 'src/app/models/ubigeo';
import { CargoService } from 'src/app/service/cargo.service';
import { TokenService } from 'src/app/service/token.service';
import { TrabajadorService } from 'src/app/service/trabajador.service';
import { UbigeoService } from 'src/app/service/ubigeo.service';
import { Utils } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-trabajador-create',
  templateUrl: './trabajador-create.component.html',
  styleUrls: ['./trabajador-create.component.css']
})
export class TrabajadorCreateComponent implements OnInit {
  btnGuardarActualizarEstado = 'registrar';
  user = new TokenService;
  isLogged: boolean = false;
  authorities: string[] = [];
  usuario: string = this.user.getUsername();
  errMsj: string;
  fecha = new Date();

  isDisabled: boolean = true;
  // variables para enviar a las clases
  cargos: Cargo[] = [];
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  trabajadores: Trabajador = {
    trabFechaRegistro: this.fecha,
    userRegistro: this.usuario,
    cargo: {
      cargoId: 1
    },
    ubigeo: {
      idUbigeo: 0,
      departamento: "-1",
      provincia: "-1",
      distrito: "-1",
    }
  };

  constructor(private trabajadorService: TrabajadorService,
    private util: Utils,
    private router: Router,
    private ubigeoService: UbigeoService,
    private tokenService: TokenService,
    private cargoService: CargoService
  ) {
    this.ubigeoService.listarDepartamento().subscribe(
      response => this.departamentos = response
    )
  }
  ngOnInit(): void {

    // doy un valor al estado del botton
    this.btnGuardarActualizarEstado = localStorage.getItem('estado')
    //
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.authorities = this.tokenService.getAuthorities();
    }
    // evaluo el boton para cargar los datos
    if (this.btnGuardarActualizarEstado == 'actualizar') {
      this.Editar();
    }
    this.cargarCargo();

  }

  Editar() {
    this.btnGuardarActualizarEstado = 'actualizar';
    // envio al empoint el id del localsotrage
    let id = localStorage.getItem('id');
    let departamento = localStorage.getItem('departamento')
    let provincia = localStorage.getItem('provincia')
    this.trabajadorService.getTrabajadorId(parseInt(id)).subscribe(data => {
      for (var t in data) {
        this.trabajadores = data[t]
        // console.log(data[t]);
      }
      this.isDisabled = false
    });
    this.ubigeoService.listaDistritos(departamento,provincia).subscribe(
      response => this.distritos = response
    );

    this.ubigeoService.listaProvincias(departamento).subscribe(
      response => this.provincias = response
    );

  }

  Nuevo() {
    this.btnGuardarActualizarEstado = "registrar";
    this.isDisabled = false
    this.Limpiar()
  }

  IngresarActualizar(value) {
    // segun al valor del boton efectuo la funcion
    if (value == "actualizar") {
      this.Actualizar();
    } else if (value == "registrar") {
      this.onRegister();
    }
  }
  Actualizar() {
    this.trabajadorService.trabajadorActualizar(this.trabajadores).subscribe(data => {
      this.util.MensajeExito(data.mensaje);
      this.router.navigate(['/trabajador/listar']);
    }), err => {
      if (err.error === null) {
        this.tokenService.logOut();
        this.router.navigate(['/login'])
      }
      this.errMsj = err.error.mensaje || err.error.mesaje;
      this.util.MensajeError(this.errMsj);
    }
  }

  onRegister() {
    // console.log(this.trabajadores)
    this.trabajadorService.trabajadorRegistrar(this.trabajadores).subscribe(
      data => {

        if (data.estatus == "FOUND") {
          this.util.MensajeError(data.mesaje)
        }
        else {
          this.util.MensajeExito(data.mensaje)
          this.router.navigate(['/trabajador/listar']);
        }
      }, err => {
        // console.log(err);
        if (err.error === null) {
          this.tokenService.logOut();
          this.router.navigate(['/login'])
        }
        this.errMsj = err.error.mensaje || err.error.mesaje;
        this.util.MensajeError(this.errMsj);
      }
    )


  }

  cargaProvincia() {
    this.ubigeoService.listaProvincias(this.trabajadores.ubigeo?.departamento).subscribe(
      response => this.provincias = response
    );
  }

  cargaDistrito() {
    this.ubigeoService.listaDistritos(this.trabajadores.ubigeo?.departamento, this.trabajadores.ubigeo?.provincia).subscribe(
      response => this.distritos = response
    );
  }

  cargarCargo() {
    this.cargoService.cargoListar().subscribe(
      response => this.cargos = response
    ), err => {
      // console.log(err);
      if (err.error === null) {
        this.tokenService.logOut();
        this.router.navigate(['/login'])
      }
      this.errMsj = err.error.mensaje || err.error.mesaje;
      this.util.MensajeError(this.errMsj);
    }
  }

  Limpiar() {
    this.trabajadores = {
      userRegistro: this.usuario,
      trabFechaRegistro: this.fecha,
      cargo: {},
      ubigeo: {
        idUbigeo: 0,
        departamento: "-1",
        provincia: "-1",
        distrito: "-1",
      }
    }
    console.log(this.trabajadores)
 
  }
  // trabajadores: Trabajador = {
  //   trabFechaRegistro: this.fecha,
  //   userRegistro: this.usuario,
  //   cargo: {
  //     cargoId: 1
  //   },
  //   ubigeo: {
  //     idUbigeo: 0,
  //     departamento: "-1",
  //     provincia: "-1",
  //     distrito: "-1",
  //   }
  // };




}
