import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any = {};
  load: boolean = false;
  imagenUrl: string = '';
  imageSelect: any;
  imagenData: any = [];
  imageAll: any = [];
  selectedImage: any;

  constructor(private img: ImageService,private router: Router) {

  }

  ngOnInit(): void {
    
  }

  onClikNav(url:string):any{
    this.router.navigate([url]);
  }

}
