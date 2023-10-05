import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IUsuarioCliente } from '../models';
import { IUsuarioDto } from '../models/dto/IUsuarioDto';

const USUARIO_CLIENTE_API = 'https://localhost:44377/api/UsuarioCliente/';

@Injectable({
  providedIn: 'root'
})
export class UsuarioClienteService {

  constructor(private http: HttpClient) { }

  getAll(filter: any): any {
    return this.http.get<any>(`${USUARIO_CLIENTE_API}`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  findOne(term: string): any {
    return this.http.get<any>(`${USUARIO_CLIENTE_API}${term}` ).toPromise()
    .then((res: any) => {
      return res
    });
  }
  
  save(usuarioCliente: IUsuarioDto): Observable<any> {
    return this.http.post<IUsuarioDto>(`${USUARIO_CLIENTE_API}`,  usuarioCliente )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }

  update(id: string, usuarioCliente: IUsuarioDto): Observable<any> {
    return this.http.put<IUsuarioCliente>(`${USUARIO_CLIENTE_API}${id}`,  usuarioCliente )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }

  delete(usuarioCliente: any): Observable<any> {
    return this.http.delete<IUsuarioCliente>(`${USUARIO_CLIENTE_API}${usuarioCliente}` )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }
}
