import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@Auth0/angular-jwt';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IAuthDto } from '../models/dto/IAuth';
import { IUsuario } from '../models/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


const IAuthDto_API = 'https://localhost:44377/api/Auth/';
const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<IUsuario | null> = new BehaviorSubject<IUsuario | null>(null);
  public user: Observable<IUsuario> = new Observable<IUsuario>();

  constructor(private http: HttpClient,  public router: Router) {
    
  }

  login(IAuthDto: IAuthDto): Observable<any> {
    
    return this.http.post<IAuthDto>(`${IAuthDto_API}`,  IAuthDto )
            .pipe(map(async (res: any) => {
              localStorage.setItem('user', JSON.stringify(res.user));
              localStorage.setItem('token', JSON.stringify(res.token));
                this.userSubject.next(res.user);
                return res;
            }));
  }

  logout():void {
   
    Swal.fire("Cerrando sesion")
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    this.router.navigate(['/']);
  }

  getUser():IUsuario{
    let user: IUsuario = {}
    if(typeof localStorage.getItem('user') == 'string'){
      let userString: any = localStorage.getItem('user');
      
      let userStored = JSON.parse(userString)
      user = userStored;
    }
    return user;
  }

  getRole(): string{
    let role:string = "admin"
    if(typeof localStorage.getItem('user') == 'string'){
      let userString: any = localStorage.getItem('user');
      
      let userStored = JSON.parse(userString);
    console.log(userStored)
      // if (typeof userStored.roles[0] != 'undefined') {
      //   let tempRole: string = userStored.roles[0];
      //   userStored.roles.forEach((r:string) => {
      //     if(role == 'admin'){
      //       tempRole = r;
      //     }
      //   });
      //   role = tempRole;
      //};
    }
    return role;
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !jwtHelper.isTokenExpired(token);
  }
}