import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArticulo } from '../models';
import { Observable, map } from 'rxjs';

const PRODUCT_API = 'https://localhost:44377/api/Articulo/';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http: HttpClient) { }
  
  getAll(filter: any): any {
    return this.http.get<any>(`${PRODUCT_API}` ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  getOne(term: string): any {
    return this.http.get<any>(`${PRODUCT_API}${term}` ).toPromise()
    .then((res: any) => {
      return res
    });
  }

  save(product: IArticulo): Observable<any> {
    return this.http.post<IArticulo>(`${PRODUCT_API}`,  product )
            .pipe(map(async (p: any) => {
                return p;
            }));
  }
  update(index:string, product: IArticulo): Observable<any> {
    return this.http.put<IArticulo>(`${PRODUCT_API}${index}`,  product )
            .pipe(map(async (p: any) => {
                return p;
            }));
  }
  delete(_id: string): Observable<any> {
    return this.http.delete(`${PRODUCT_API}${_id}` )
            .pipe(map(async () => {
                return true;
            }));
  }
}
