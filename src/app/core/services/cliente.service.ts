import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, map } from 'rxjs';
import { IAuthDto } from '../models/dto/IAuth';
import { Router } from '@angular/router';
import { ICliente } from '../models';
import { environment } from 'src/environments/environment';


const USER_API = environment+'Cliente/';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  constructor(private http: HttpClient, public router: Router) {

  }

  obtenerTodo(filter: any): any {
    return this.http.get<any>(`${USER_API}`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  buscarUno(string: string): any {
    return this.http.get<any>(`${USER_API+string}`).toPromise()
    .then((res: any) => {
      return res
    });
  }

  register(user: ICliente): Observable<any> {
    return this.http.post<ICliente>(`${USER_API}`, user)
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  guardar(user: ICliente): Observable<any> {
    return this.http.post<ICliente>(`${USER_API}`,  user )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  actualizar(_id:string, user: ICliente): Observable<any> {
    return this.http.put<ICliente>(`${USER_API}${_id}`,  user )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  eliminar(_id:string): Observable<any> {
    return this.http.delete<IAuthDto>(`${USER_API}${_id}` )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
}
