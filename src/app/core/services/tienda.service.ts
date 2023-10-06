import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, map } from 'rxjs';
import { IAuthDto } from '../models/dto/IAuth';
import { Router } from '@angular/router';
import { ICliente, ITienda } from '../models';
import { environment } from 'src/environments/environment';


const USER_API = environment.apiPath+'Tienda/';


@Injectable({
  providedIn: 'root',
})
export class TiendaService {

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

  register(user: ITienda): Observable<any> {
    return this.http.post<ITienda>(`${USER_API}`, user)
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  guardar(user: ITienda): Observable<any> {
    return this.http.post<ITienda>(`${USER_API}`,  user )
            .pipe(map(async (u: any) => {
                return u;
            }));
  }
  actualizar(_id:string, user: ITienda): Observable<any> {
    return this.http.put<ITienda>(`${USER_API}${_id}`,  user )
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
