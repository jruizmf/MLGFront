import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthDto } from 'src/app/core/models/dto/IAuth';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted:boolean = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
  });
  errorMessage: string = "";

  get f() { return this.loginForm.controls; }

  constructor(public fb: FormBuilder, private _auth: AuthService, public router: Router) {}

  ngOnInit(): void {
  }
  submit():void {
   this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }

    this._auth.login({
      userName: this.f.email.value,
      password: this.f.password.value
    }).subscribe( () => {
      this.loginForm.disable();
      this.router.navigate(['dashboard']);
    })
  }
}
