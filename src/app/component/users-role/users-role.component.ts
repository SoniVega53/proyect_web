import { Component, Input, OnInit } from '@angular/core';
import { PublicityService } from 'src/app/services/publicity.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-role',
  templateUrl: './users-role.component.html',
  styleUrls: ['./users-role.component.css']
})
export class UsersRoleComponent implements OnInit{
  users: any = []
  publisities: any = [];
  @Input() table:boolean = true;

  constructor(private userService: UserService,private pub: PublicityService) {}

  ngOnInit(): void {
   

    this.getViewPublicityAll()
    this.getViewUserAll()
  }

  getViewUserAll() {
    this.userService.getUseRole().subscribe(
      (data) => {
        this.users = data;
        this.table = data.length > 0
      },
      (error) => {
        
      }
    );
  }

  getViewPublicityAll() {
    this.pub.getLoadPublicityAllDate().subscribe(
      (response) => {
        if (response != null) {
          this.publisities = response;
        }
      },
      (error) => {
        console.error('Error al obtener la imagen:', error);
      }
    );
  }
}
