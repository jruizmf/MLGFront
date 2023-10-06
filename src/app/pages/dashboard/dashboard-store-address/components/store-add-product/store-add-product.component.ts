import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StoreAddressComponent } from '../../store-address.component';
import { IArticulo, ITiendaArticulo } from 'src/app/core/models';
import { TiendaArticuloService } from 'src/app/core/services/tiendaArticulos.service';
import { Router } from '@angular/router';
import { ArticulosService } from 'src/app/core/services/articulos.service';

@Component({
  selector: 'app-store-add-product',
  templateUrl: './store-add-product.component.html',
  styleUrls: ['./store-add-product.component.scss']
})
export class StoreAddProductComponent {
  tiendaArticulo:ITiendaArticulo = {
    
  };

  productos:IArticulo[] = []

  constructor( private dialogRef: MatDialogRef<StoreAddressComponent>, @Inject(MAT_DIALOG_DATA) public data: any, 
  private _tiendaArticuloService: TiendaArticuloService, private _articuloService: ArticulosService, private router: Router){
    this.tiendaArticulo.tiendaId = data.tiendaId;
    this.tiendaArticulo.fecha = new Date;
    this.tiendaArticulo.articuloId = "";
    this._articuloService.obtenerTodo({}).then((a:any) =>{
   
      this.productos = a;
    });

  }

  ngOnInit(){
    this._articuloService.obtenerTodo({}).then((a:any) =>{
      this.productos = a.articulo;
    });
  }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    submit():void {
      if(this.tiendaArticulo.articuloId != ""){
        this._tiendaArticuloService.guardar(this.tiendaArticulo).subscribe( () => {
          this.dialogRef.close();
          }, (error) => {
            Swal.fire('Algo Salió mal..', 'Por favor intente de nuevo!', 'error')
          }
        );
      } else{
        Swal.fire('Algo Salió mal..', 'Por favor seleccione una tienda!', 'warning')
      }
    }
    cambiarDatos(event: any){
      this.tiendaArticulo.articuloId = event;
    }
}
