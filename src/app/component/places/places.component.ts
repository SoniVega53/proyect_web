import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelsService } from 'src/app/services/travels.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  placesList !: any[];


  constructor(private trav: TravelsService,private router: Router){

  }

  ngOnInit(): void {
    this.getViewPlaceAll();
  }

  getViewPlaceAll() {
    this.trav.getLoadPlaceAll().subscribe(
      (response) => {
        if (response != null) {
          this.placesList = response;
        
        }
      },
      (error) => {
        console.error('Error al obtener la imagen:', error);
      }
    );
  }

  getDeletePlace(id: string) {
    this.trav.getDeleteById(id).subscribe(
      (response) => {
        
        Swal.fire(
          'Eliminar',
          'Se elimino correctamente',
          'success'
        )
        this.getViewPlaceAll()
      },
      (error) => {
        Swal.fire(
          'Error',
          error.error,
          'error'
        )
        
      }
    );
  }
  
  navEdit(id: string) {
    this.router.navigate(['/places/update/',id]);
  }
}
