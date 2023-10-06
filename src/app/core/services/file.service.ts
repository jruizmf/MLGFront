import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, map } from 'rxjs';

const FILE_API = 'https://localhost:44377/api/Upload/';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient,  public router: Router) {
    
  }

  upload(file: File): any{
    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${FILE_API}`,  formData, {responseType: 'text'} ).toPromise().then( (res: any) => {
                return res;
            });
  }

  delete(url: string): Observable<any> {
    return this.http.post<any>(`${FILE_API}delete`,  url )
            .pipe(map(async (res: any) => {
                return res;
            }));
  }

  uploadMultiple(files: File[]): any {
    try {
      let _files: any[] = []
      if (files.length > 0) {
        files.forEach( (file: File) => {
          this.http.post<any>(`${FILE_API}upload`,  file )
              .pipe(map(async (res: any) => {
                _files.push(res);
              }));
        })
      }
      
      return {data: _files, status: true};
    } catch (error) {
      return {error: error, status: false};
    }
    
  }
}
