import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IArticulo } from 'src/app/core/models';
import { ArticulosService } from 'src/app/core/services/articulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss']
})
export class DashboardProductComponent  implements OnInit {
  view = 'list';

  articulos: IArticulo[] | undefined;
  constructor(private _articuloService : ArticulosService, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAll();
  }
  async  getAll(){
    await this._articuloService.getAll({}).then((x: any[]) => {
      this.articulos = x;
    })
  }
  deleteProduct(_id: string){
    this._articuloService.delete(_id).subscribe( (res) => {
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
