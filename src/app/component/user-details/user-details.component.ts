import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  pass:string = '';
  passNew:string = '';
  botonDeshabilitado: boolean = true;
  user: any = {}
  

  constructor(private auth: AuthorizationService, private router: Router, private userService: UserService) {

  }

  ngOnInit(): void {
    if (!this.auth.authorization()) {
      this.user = this.auth.infUser();
    }
  }

  setNewPassword() {
    const datos = { 
      password: this.pass,
      passwordNew: this.passNew
    };

    this.userService.actualizarDatos(this.auth.infUser().idUser,datos).subscribe(
      (data) => {
        Swal.fire(
          'Contraseña Correcta',
          'Se cambio Correctamente la contraseña',
          'success'
        )
        localStorage.setItem('user',JSON.stringify(data))
        this.pass = ""
        this.passNew = ""
      },
      (error) => {
        Swal.fire(
          'Contraseña Incorrecta',
          'Debe de ingresar su contraseña actual correctamente para poder crear una nueva',
          'error'
        )
      }
    );
  }

  
  onInputChange() {
    this.botonDeshabilitado = this.pass.trim() === '' || this.passNew.trim() === '';
  }
}
