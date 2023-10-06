import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IAuthDto } from '../models/dto/IAuth';
import { IUsuario} from '../models/usuario';
import { Router } from '@angular/router';
import { IUsuarioDto } from '../models/dto/IUsuarioDto';


const USER_API = 'https://localhost:44377/api/Usuario/';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public user: Observable<IUsuario> = new Observable<IUsuario>();

  constructor(private http: HttpClient, public router: Router) {

  }

  obtenerTodo(filter: any): any {
    return this.http.get<any>(`${USER_API}`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  findOne(string: string): any {
    return this.http.get<any>(`${USER_API+string}`).toPromise()
    .then((res: any) => {
      return res
    });
  }

  register(user: IUsuarioDto): Observable<any> {
    return this.http.post<IUsuarioDto>(`${USER_API}`, user)
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  save(user: IUsuario): Observable<any> {
    return this.http.post<IUsuario>(`${USER_API}create`,  user )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  update(_id:string, user: IUsuario): Observable<any> {
    return this.http.put<IUsuario>(`${USER_API}${_id}`,  user )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  delete(_id:string): Observable<any> {
    return this.http.delete<IAuthDto>(`${USER_API}${_id}` )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
}
