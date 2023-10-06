import { Component } from '@angular/core';
import { ITienda } from 'src/app/core/models';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TiendaService } from 'src/app/core/services/tienda.service';
import { MatDialog } from '@angular/material/dialog';
import { StoreAddProductComponent } from './components/password-editor/store-add-product.component';




@Component({
  selector: 'app-store-address',
  templateUrl: './store-address.component.html',
  styleUrls: ['./store-address.component.scss']
})
export class StoreAddressComponent {
  tiendas: ITienda[]  = [];
  imageUrl: string = environment.filesPath;

  constructor(private _tiendaService: TiendaService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.obtenerTodo()
  }

  async  obtenerTodo(){
    await this._tiendaService.obtenerTodo({}).then((x: ITienda[]) => {
      this.tiendas = x;
    })
  }
  eliminarTienda(articulo: ITienda){
    this._tiendaService.eliminar(articulo.id!).subscribe( (res) => {
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
  abrirModal(id:string): void {
    const dialogRef = this.dialog.open(StoreAddProductComponent, {
      data: {
        tiendaId:id
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result != 'undefined') {
      }
    });
  }
}
