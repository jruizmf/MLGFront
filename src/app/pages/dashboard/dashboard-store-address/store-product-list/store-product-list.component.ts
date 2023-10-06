import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticulo, IArticuloCliente } from 'src/app/core/models';
import { ArticulosService } from 'src/app/core/services/articulos.service';
import Swal from 'sweetalert2';
import { environment } from './../../../../../environments/environment';
import { TiendaArticuloService } from 'src/app/core/services/tiendaArticulos.service';

@Component({
  selector: 'app-store-product-list',
  templateUrl: './store-product-list.component.html',
  styleUrls: ['./store-product-list.component.scss']
})
export class StoreProductListComponent  implements OnInit {
  view = 'list';
  imageUrl : string = environment.filesPath;
  articulos: IArticuloCliente[] | undefined;
  tiendaId: string = "";
  constructor(private _articuloService : TiendaArticuloService, private router: Router, public dialog: MatDialog, private route : ActivatedRoute) { 
    this.tiendaId = this.route.snapshot.paramMap.get('term') || ""; 
  }

  ngOnInit(): void {
    this.obtenerTodo();
  }
  async  obtenerTodo(){
    await this._articuloService.buscarPorTienda(this.tiendaId).then((x: any[]) => {
      this.articulos = x;
    })
  }
  deleteProduct(articulo: any){

  
    this._articuloService.eliminar(articulo.id).subscribe( (res) => {
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
