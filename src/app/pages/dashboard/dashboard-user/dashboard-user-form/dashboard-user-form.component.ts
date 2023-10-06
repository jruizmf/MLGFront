import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/core/models';
import { IUsuarioCliente } from 'src/app/core/models';
import Swal from 'sweetalert2';
import { DashboardUserPasswordEditorComponent } from '../components/password-editor/password-editor.component';
import { IUsuarioDto } from 'src/app/core/models/dto/IUsuarioDto';
import { UsuarioClienteService } from 'src/app/core/services/usuarioClientes.service';

@Component({
  selector: 'app-dashboard-user-form',
  templateUrl: './dashboard-user-form.component.html',
  styleUrls: ['./dashboard-user-form.component.scss']
})
export class DashboardUserFormComponent {
  @ViewChild('fileInput') fileInput: ElementRef | null | undefined = {} as ElementRef;
  form: FormGroup = new FormGroup({});
  flag: boolean = true;
  errors:any[]= [];
  usuario: IUsuarioDto = {
    usuarioNombre: "",
    nombre: "",
    apellidos: "",
    status: 1,
    direccion: "",
    fecha: new Date,
 
  };
  isEditing : boolean = false;
  userID: any = "";
  confirmarContrasena: any = "";
  images: any = [];

  constructor(private _usuarioService: UsuarioClienteService, private _usuarioClienteService: UsuarioClienteService, private dialog: MatDialog,  private router: Router, private route : ActivatedRoute) { 
    this.userID = this.route.snapshot.paramMap.get('term')
    console.log(this.userID)
    if (this.userID == null) {
      this.isEditing = false
    } else{
      this.isEditing = true;
      this._usuarioClienteService.buscarUno(this.userID).then((res:any) => {
        this.usuario = {
          usuarioId: res.usuario.id,
          usuarioNombre: res.usuario.usuarioNombre,
          clienteId: res.cliente.id,
          nombre: res.cliente.nombre,
          apellidos: res.cliente.apellidos,
          direccion: res.cliente.direccion,       
        };
      });
    }
  }

  ngOnInit(): void {
    this._usuarioService.buscarUno(this.userID).then((res:any) => {
      console.log(res)
      this.usuario = {
        usuarioId: res.usuario.Id,
          usuarioNombre: res.usuario.usuarioNombre,
          clienteId: res.cliente.Id,
          nombre: res.cliente.nombre,
          apellidos: res.cliente.apellidos,
          direccion: res.cliente.direccion,       
      };
    })  
  }
  
  addImages(event:any): void{
    this.images = event;
  }
  
  getUserForm():IUsuario{
    return this.usuario;
  }
  guardar() {
    let _usuario: IUsuarioDto = this.getUserForm()

      if (this.isEditing) {
        console.log(_usuario)
        this._usuarioService.actualizar(this.userID, _usuario).subscribe( () => {
          console.log("Update")
          Swal.fire('Actualización de usuario..', 'Usuario modificado exitosamente!', 'success')
          this.router.navigate(['dashboard/usuarios']);
          }, (error: any) => {
            console.log("error")
            console.log(error)
            Swal.fire('Algo Salió mal..', 'Por favor intente de nuevo!', 'error')
          }
        );      
      } else{

        if(this.usuario.password == this.confirmarContrasena){
          this._usuarioService.guardar(_usuario).subscribe( () => {
            this.form.disable();
            this.router.navigate(['dashboard/usuarios']);
            }, (error) => {
              console.log(error)
              Swal.fire('Algo Salió mal..', 'Por favor intente de nuevo!', 'error')
            }
          );
        } else{
          Swal.fire('Error en Contraseña..', 'Las contraseñas no coinciden!', 'error')
        }
      }
    
   
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DashboardUserPasswordEditorComponent, {
      data: {
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result != 'undefined') {
        this.usuario.password = result;
      }
    });
  }
}
