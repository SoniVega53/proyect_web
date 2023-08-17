import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  email:string = '';
  user: any = {}
  
  constructor(private auth:AuthorizationService,private router: Router,private userService:UserService){

  } 

  ngOnInit(): void {
    if (this.userService.getAuth()) {
      this.user = this.auth.infUser();
      this.email = this.user != null ? this.user.email : "";
    }
  }

  logout(){
    this.auth.getLogout();
    window.location.reload();
  }


  isUser():boolean {
    return this.email != null ? this.email.length > 0 : true;
  }

}
