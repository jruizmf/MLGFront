import { Injectable } from '@angular/core';
import { IArticuloCliente } from '../models/articuloCliente';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const ORDER_API = 'http://localhost:44377/api/Ordenes/';

@Injectable({
  providedIn: 'root'
})
export class ClienteArticuloService {

  constructor(private http: HttpClient) { }

  getAll(filter: any): any {
    return this.http.get<any>(`${ORDER_API}`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  findByTerm(term: string): any {
    return this.http.get<any>(`http://localhost:44377/api/ordenes/${term}` ).toPromise()
    .then((res: any) => {
      return res
    });
  }
  getUser(filter: any): any {
    return this.http.get<any>(`${ORDER_API}user`,  filter ).toPromise()
    .then((res: any) => {
      return res
    });
  }
  save(order: IArticuloCliente): Observable<any> {
    return this.http.post<IArticuloCliente>(`${ORDER_API}`,  order )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }

  update(order: IArticuloCliente): Observable<any> {
    return this.http.patch<IArticuloCliente>(`${ORDER_API}${order?.id}`,  order )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }

  delete(order: IArticuloCliente): Observable<any> {
    return this.http.delete<IArticuloCliente>(`${ORDER_API}${order.id}` )
            .pipe(map(async (x: any) => {
                return x;
            }));
  }
}
