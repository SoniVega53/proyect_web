import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string = "";
  password:string = "";
  botonDeshabilitado: boolean = true;
  userExist: boolean = false;
  userAccess:boolean = false;
  user:any = [];

  constructor(private userService:UserService,private router: Router,private auth:AuthorizationService) { }

  ngOnInit():void{
    
  }
  

  setUserLogin(){
    this.userService.getLogin(this.email,this.password).subscribe(
      (res:any) => this.getUserLogin(res)
    );
   
  }

  getUserLogin(response:any){
    if (response != null) {
      this.user = response;
      if(this.user.role == "admin") {
        window.sessionStorage.setItem('user',JSON.stringify(response))
        window.sessionStorage.setItem('Session', "true")
        window.location.reload();
       
      }else{
        this.userAccess = true;
        this.userExist = false;
        this.getTimeout();
      }
     
    }else{
      this.userExist = true
      this.userAccess = false;
      this.getTimeout();
    }
   
  }

  getTimeout() {
    // Se ejecutará la función después de 3 segundos (3000 ms)
    setTimeout(() => {
      this.userExist = false;
      this.userAccess = false;
    }, 1000);
  }

  onInputChange() {
    this.botonDeshabilitado = this.email.trim() === '' || this.password.trim() === '';
  }

}
