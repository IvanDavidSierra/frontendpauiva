import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

  constructor(private http: HttpClient) { }

  uploadFile(foto: File, inmueble: any, comercialId: number, propietarioId: number): Promise<any> {
    const formData = new FormData();
    formData.append('foto', foto);
    formData.append('inmueble', JSON.stringify(inmueble));
    formData.append('comercialId', comercialId.toString());
    formData.append('propietarioId', propietarioId.toString());
    return this.http.post<any>('http://localhost:8080/inmueble/submit', formData).toPromise();
  }
}
