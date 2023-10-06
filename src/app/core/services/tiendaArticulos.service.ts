import { Injectable } from '@angular/core';
import { IArticuloCliente } from '../models/articuloCliente';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

const ORDER_API = environment.apiPath+'TiendaArticulo/';

@Injectable({
  providedIn: 'root'
})
export class TiendaArticuloService {

  constructor(private http: HttpClient) { }

  obtenerTodo(filter: any): any {
    return this.http.get<any>(`${ORDER_API}`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  buscarPorUsuario(term: string): any {
    return this.http.get<any>(`https://localhost:44377/api/TiendaArticulo/Usuario/${term}` ).toPromise()
    .then((res: any) => {
      return res
    });
  }
  

  buscarUno(term: string): any {
    return this.http.get<any>(`https://localhost:44377/api/ClienteArticulo/${term}` ).toPromise()
    .then((res: any) => {
      return res
    });
  }
  
  guardar(order: IArticuloCliente): Observable<any> {
    return this.http.post<IArticuloCliente>(`${ORDER_API}`,  order )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }

  actualizar(order: IArticuloCliente): Observable<any> {
    return this.http.patch<IArticuloCliente>(`${ORDER_API}${order?.id}`,  order )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }

  eliminar(order: IArticuloCliente): Observable<any> {
    return this.http.delete<IArticuloCliente>(`${ORDER_API}${order.id}` )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }
}
