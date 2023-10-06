import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IArticulo } from 'src/app/core/models';
import { ArticulosService } from 'src/app/core/services/articulos.service';
import Swal from 'sweetalert2';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss']
})
export class DashboardProductComponent  implements OnInit {
  view = 'list';
  imageUrl : string = environment.filesPath;
  articulos: IArticulo[] | undefined;
  constructor(private _articuloService : ArticulosService, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerTodo();
  }
  async  obtenerTodo(){
    await this._articuloService.obtenerTodo({}).then((x: any[]) => {
      console.log(x)
      this.articulos = x;
    })
  }
  deleteProduct(_id: string){
    this._articuloService.eliminar(_id).subscribe( (res) => {
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
