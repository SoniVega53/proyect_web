import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {
  public urlService: string = "http://localhost:8080/api/"

  constructor(public http:HttpClient) { }

  public  getService(url:string):Observable<any>{
    return this.http.get<any>(this.urlService.concat(url)).pipe(
      catchError(e=>"error")
    );
  }

  public getServices(url:string):Observable<any>{
    return this.http.get(this.urlService.concat(url), { responseType: 'text' });
  }

  public putService(url:string,datos: any,headers:HttpHeaders):Observable<any>{
    return this.http.put<any>(this.urlService.concat(url), datos, { headers });
  }

  public postServiceBodyImage(url:string,body: any):Observable<any>{
    // const body = {
    //   dato: this.dato
    // };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.urlService.concat(url), body).pipe(
      catchError(e=>"error")
    );
  }

  public postService(url:string,body: any):Observable<any>{
    // const body = {
    //   dato: this.dato
    // };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.urlService.concat(url), body)
  }

  public putServiceBodyImage(url:string,body: any):Observable<any>{
    // const body = {
    //   dato: this.dato
    // };
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.put<any>(this.urlService.concat(url), body).pipe(
      catchError(e=>"error")
    );;
  }


  public putServiceBody(url:string,body: any):Observable<any>{
    return this.http.put<any>(this.urlService.concat(url), body)
  }

  public putServiceParams(url:string,datos: any,params:HttpParams):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(this.urlService.concat(url), datos, { headers,params});
  }

  public putServiceParams2(url:string,datos: any,params:HttpParams):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(this.urlService.concat(url), datos, {params});
  }

  public postServiceParams(url:string,datos: any,params:HttpParams):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.urlService.concat(url), datos, {params});
  }

}
