import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http'
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseServiceService {

  getLoadImagenById(id: string): Observable<any> {
    return this.getService(`viewImage/${id}`);
  }

  getLoadImagenAll(): Observable<any> {
    return this.getService(`viewImage`);
  }

  getLoadImagenType(type:string): Observable<any> {
    return this.getService(`viewImageType/${type}`);
  }

  postSaveImage(file:File,type:string): Observable<any> {
    const body = new FormData();
    body.append('file', file);

    return this.postServiceBodyImage(`SaveImage/${type}`, body);
  }

  postSaveImageBase64(params:HttpParams,type:string): Observable<any> {
    return this.postServiceBodyImage(`SaveImageBase64/${type}`, params);
  }

  getDeleteImageById(id: string): Observable<any> {
    return this.getService(`deleteImage/${id}`);
  }


  obtenerDatos(id: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`deleteImage/${id}`, { observe: 'response' });
  }
}
