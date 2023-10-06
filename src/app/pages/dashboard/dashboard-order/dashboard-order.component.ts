import { Component, OnInit } from '@angular/core';
import { IArticuloCliente } from 'src/app/core/models';
import { ClienteArticuloService } from 'src/app/core/services/clienteArticulos.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.scss']
})
export class DashboardOrderComponent implements OnInit {
  ordenes: IArticuloCliente[]  = [];
  imageUrl: string = environment.filesPath;

  constructor(private _ordenService: ClienteArticuloService) {}
  ngOnInit(): void {
    this.obtenerTodo()
  }

  async  obtenerTodo(){
    await this._ordenService.obtenerTodo({}).then((x: IArticuloCliente[]) => {
      this.ordenes = x;
    })
  }
  eliminarProducto(articulo: IArticuloCliente){
    this._ordenService.delete(articulo).subscribe( (res) => {
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
