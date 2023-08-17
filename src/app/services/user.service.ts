import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable, catchError } from 'rxjs';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseServiceService{
  

  getUserListAll():Observable<any>{
    return this.getService("user");
  }

  getUseRole():Observable<any>{
    return this.getService("userRoleUser");
  }

  getLogin(email:string,password:string):Observable<any>{
    return this.getService(`login/${email}/${password}`);
  }

  getUpdatePassword(id:string,password:string,passwordNew:string):Observable<any>{
    return this.getService(`userSave/${id}/${password}/${passwordNew}`);
  }

  actualizarDatos(id: string, datos: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('password', datos.password); 
    params = params.set('passwordNew', datos.passwordNew); 

    return this.putServiceParams(`userUpdate/${id}`,null,params);
  }

  getAuth(): boolean {
    const isAuth = window.sessionStorage.getItem('Session')
    if (isAuth) {
      return true;
    }
    return false;
  }
  
  getLogout() {
    window.sessionStorage.clear()
  }
 
}
