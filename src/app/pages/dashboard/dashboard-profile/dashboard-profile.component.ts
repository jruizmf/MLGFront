import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/app/core/models';
import { IUsuarioDto } from 'src/app/core/models/dto/IUsuarioDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'll-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {
  user: IUsuarioDto;

  constructor(private _usuarioService: UsuarioService, private _auth: AuthService) { 
    this.user = this._auth.getUser();
    this.getUser()
  }

  ngOnInit(): void {
  }

  getUser(){
    // if (typeof this.user.id == 'string') {
    //   this._usuarioService.findOne(this.user.id).then((res:any) => {
    //     this.user = res.user;
    //   })
    // }
    
  }
}
