import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/core/models';
import { FileService } from 'src/app/core/services/file.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';
import { ProfilePasswordEditorComponent } from '../components/password-editor/password-editor.component';
import { IUsuarioDto } from 'src/app/core/models/dto/IUsuarioDto';
import { DashboardUserPasswordEditorComponent } from '../../dashboard-user/components/password-editor/password-editor.component';
import { UsuarioClienteService } from 'src/app/core/services/usuarioClientes.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
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
      this._usuarioClienteService.findOne(this.userID).then((res:any) => {
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
    this._usuarioService.findOne(this.userID).then((res:any) => {
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
  save() {
    let _usuario: IUsuarioDto = this.getUserForm()

      if (this.isEditing) {
        console.log(_usuario)
        this._usuarioService.update(this.userID, _usuario).subscribe( () => {
          console.log("Update")
          Swal.fire('Actualización de Perfil..', 'Perfil modificado exitosamente!', 'success')
          this.router.navigate(['dashboard/usuarios']);
          }, (error: any) => {
            Swal.fire('Algo Salió mal..', 'Por favor intente de nuevo!', 'error')
          }
        );      
      
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
