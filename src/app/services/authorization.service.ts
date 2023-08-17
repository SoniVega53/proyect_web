import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  public authorization():boolean{
    
    return window.sessionStorage.getItem("user") == "" ;
  }

  public infUser(): any {
    const valor = window.sessionStorage.getItem('user'); // Reemplaza 'clave' con el nombre de la clave que deseas obtener.
    return JSON.parse(valor!);
  }

  public infUserData(): any {
    const valor = window.sessionStorage.getItem('user'); // Reemplaza 'clave' con el nombre de la clave que deseas obtener.
    return valor;
  }

  getLogout() {
    window.sessionStorage.clear()
  }
}
