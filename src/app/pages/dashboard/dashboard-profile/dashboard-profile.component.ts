import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario, IUsuarioCliente } from 'src/app/core/models';
import { IUsuarioDto } from 'src/app/core/models/dto/IUsuarioDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { UsuarioClienteService } from 'src/app/core/services/usuarioClientes.service';

@Component({
  selector: 'll-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {

  user: any;
  usuario: IUsuarioCliente = {
    usuarioId: "",
  };

  constructor(private _usuarioService: UsuarioClienteService, private _auth: AuthService) { 
    this.user = this._auth.getUser();
    console.log("this.user")
    console.log(this.user)
    this._usuarioService.buscarUno(this.user.id!).then((res:any) => {
      this.usuario = res;
    })
  }

  ngOnInit(): void {
  }

  getUser(){
      
    
    
  }
}
