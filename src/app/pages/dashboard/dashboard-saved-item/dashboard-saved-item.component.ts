import { Component, OnInit } from '@angular/core';
import { IArticuloCliente } from 'src/app/core/models';
import { ClienteArticuloService } from 'src/app/core/services/clienteArticulos.service';
import { productsDB } from 'src/app/shared/data/products';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'll-dashboard-saved-item',
  templateUrl: './dashboard-saved-item.component.html',
  styleUrls: ['./dashboard-saved-item.component.scss']
})
export class DashboardSavedItemComponent implements OnInit {
  ordenes: IArticuloCliente[]  = [];
  imageUrl: string = environment.filesPath;

  constructor(private _ordenService: ClienteArticuloService) {}
  ngOnInit(): void {
    this.obtenerTodo()
  }

  async  obtenerTodo(){
    let usuario = JSON.parse(localStorage.getItem('user') || '{}');
    await this._ordenService.buscarPorUsuario(usuario.cliente.clienteId).then((x: any[]) => {
      console.log(x)
      this.ordenes = x;
    })
  }
  eliminarProducto(articulo: IArticuloCliente){
    this._ordenService.eliminar(articulo).subscribe( (res) => {
      window.location.reload();
      }, (error) => {
        Swal.fire('Algo salió mal..', 'Favor de contactar a su administrador!', 'error')
      }
    )
  }
  handleDenial(){

  }
  handleDismiss(event:any){
    
  }
}
