import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuarioDto } from 'src/app/core/models/dto/IUsuarioDto';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  submitted:boolean = false;

  signupForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(4)]],
    apellidos: ['', [ Validators.minLength(4)]],
    direccion: ['', [Validators.required, Validators.minLength(4)]],
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  });
  errorMessage: string = "";
  _matchPassword: boolean = false;

  get f() { return this.signupForm.controls; }

  get matchPassword() { return this._matchPassword; }

  
  constructor(public fb: FormBuilder, private _usuarioService: UsuarioService, public router: Router) {}

  ngOnInit(): void {
  }

  submit():void {
    this.submitted = true;
    if (!this.signupForm.valid || !this.validatePassword()) {
      return;
    }

    this._usuarioService.register({
      nombre: this.f.nombre.value,
      apellidos: this.f.apellidos.value,
      direccion: this.f.direccion.value,
      usuarioNombre: this.f.usuario.value,
      password: this.f.password.value,
    }).subscribe( (res: any) => {
      this.signupForm.disable();

      this.router.navigate(['auth/login']);
    })    
  }

  validatePassword():boolean{
    if(this.signupForm.controls['password'].value == this.signupForm.controls['confirmPassword'].value){
      this._matchPassword = true;
      return true;
    } else{
      this._matchPassword = false;
      Swal.fire('Contraseña', "Las contraseñas no coinciden!", 'error')
      return false;
    }
  }
}
