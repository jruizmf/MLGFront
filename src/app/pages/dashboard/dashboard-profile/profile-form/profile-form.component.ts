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

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | null | undefined = {} as ElementRef;
  form: FormGroup = new FormGroup({});
  flag: boolean = true;
  errors:any[]= [];
  hasPasswordAdded:boolean = false;
  user: IUsuarioDto = {
    usuarioNombre: "",
    nombre: "",
    apellidos: "",
    status: 1,
    direccion: "",
    fecha: new Date,
 
  };
  fileName: string = "";
  fileAttr = 'Choose File';
  userID: any = "";
  constructor(private _usuarioService: UsuarioService, private dialog: MatDialog, private _uploadService: FileService, private router: Router, private route : ActivatedRoute) { 
    this.userID = this.route.snapshot.paramMap.get('term')
  }


  getUser(){
    this._usuarioService.findOne(this.userID).then((res:any) => {
      this.user = res.user;
    })  
  }

  ngOnInit(): void {
    this._usuarioService.findOne(this.userID).then((res:any) => {
      console.log(res)
      this.user = res;
    
    })  
  }
  
  
  getUserForm():IUsuario{
    return this.user;
  }
  
  save() {
    let user: IUsuario = this.getUserForm()
    setTimeout(()=>{   
      this._usuarioService.update(this.userID, user).subscribe( () => {
        this.form.disable();
        this.router.navigate(['dashboard/profile']);
        }, () => {
          Swal.fire('Something was wrong..', 'Please contact with technical support!', 'error')
        }
      )
    }, 5000);   
   
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProfilePasswordEditorComponent, {
      data: {
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result != 'undefined') {
        this.user.password = result;
        this.hasPasswordAdded = true;
      }
    });
  }
}
