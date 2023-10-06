import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ITienda, IUsuario } from 'src/app/core/models';
import { IUsuarioCliente } from 'src/app/core/models';
import Swal from 'sweetalert2';
import { IUsuarioDto } from 'src/app/core/models/dto/IUsuarioDto';
import { UsuarioClienteService } from 'src/app/core/services/usuarioClientes.service';
import { TiendaService } from 'src/app/core/services/tienda.service';

@Component({
  selector: 'app-store-address-form',
  templateUrl: './store-address-form.component.html',
  styleUrls: ['./store-address-form.component.scss']
})
export class StoreAddressFormComponent {
  @ViewChild('fileInput') fileInput: ElementRef | null | undefined = {} as ElementRef;
  form: FormGroup = new FormGroup({});
  tienda: ITienda = {
    sucursal: "",
    direccion: "",
    fecha: new Date,
 
  };
  isEditing : boolean = false;
  tiendaId: any = "";

  constructor(private _tiendaService: TiendaService, private router: Router, private route : ActivatedRoute) { 
    this.tiendaId = this.route.snapshot.paramMap.get('term')
    console.log(this.tiendaId)
    if (this.tiendaId == null) {
      this.isEditing = false
    } else{
      this.isEditing = true;
      this._tiendaService.buscarUno(this.tiendaId).then((res:any) => {
        this.tienda = {
          sucursal: res.sucursal,
          direccion : res.direccion,
          fecha: res.fecha       
        };
      });
    }
  }

  ngOnInit(): void {
    this._tiendaService.buscarUno(this.tiendaId).then((res:any) => {
      this.tienda = {
        sucursal: res.sucursal,
        direccion : res.direccion,
        fecha: res.fecha       
      };
    })  
  }
  
  getUserForm():ITienda{
    return this.tienda;
  }
  guardar() {
    let tienda: ITienda = this.getUserForm()

      if (this.isEditing) {
        console.log(tienda)
        this._tiendaService.actualizar(this.tiendaId, tienda).subscribe( () => {
          console.log("Update")
          Swal.fire('Actualización de tienda..', 'Tienda modificada exitosamente!', 'success')
          this.router.navigate(['dashboard/tiendas']);
          }, (error: any) => {
            console.log("error")
            console.log(error)
            Swal.fire('Algo Salió mal..', 'Por favor intente de nuevo!', 'error')
          }
        );      
      } else{
          this._tiendaService.guardar(tienda).subscribe( () => {
            this.form.disable();
            this.router.navigate(['dashboard/tiendas']);
            }, (error) => {
              console.log(error)
              Swal.fire('Algo Salió mal..', 'Por favor intente de nuevo!', 'error')
            }
          );
      }
    
   
  }
 
}
