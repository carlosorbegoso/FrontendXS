import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLogged = false;
  nombreUsuario = '';
  nombreRol = '';

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUsername();
      
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
      
    }
  }
  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}