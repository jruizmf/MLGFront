import { Component, OnInit } from '@angular/core';
import { IUsuarioCliente } from 'src/app/core/models';
import { UsuarioClienteService } from 'src/app/core/services/usuarioClientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  view = 'list';
  
  usuarios: IUsuarioCliente[] | undefined;
  constructor(private _usuarioService: UsuarioClienteService) {}
  
  ngOnInit(): void {
    this.obtenerTodo()
  }

  async  obtenerTodo(){
    await this._usuarioService.obtenerTodo({}).then((x: IUsuarioCliente[]) => {
      console.log(x)
      this.usuarios = x;
    })
  }
  eliminarUsuario(_id: any){
    this._usuarioService.delete(_id).subscribe( (res) => {
      window.location.reload();
      }, (error) => {
        console.log()
        Swal.fire('Algo salió mal..', 'Favor de contactar a su administrador!', 'error')
      }
    )
  }
  handleDenial(){

  }
  handleDismiss(event:any){
    
  }
}
