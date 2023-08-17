import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelsService } from 'src/app/services/travels.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-places',
  templateUrl: './new-places.component.html',
  styleUrls: ['./new-places.component.css']
})
export class NewPlacesComponent implements OnInit {
  params = new HttpParams();
  imageSelect !: string;
  imageSelectId !: string;
  description !: string;
  namePlace !: string;
  placeEditId: any = '';


  constructor(private trav: TravelsService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.getViewPlaceById()
  }

  onImageChange(imageSelect: any) {
    this.imageSelect = imageSelect.url;
    this.imageSelectId = imageSelect.id;
  }

  isImageSelect(): boolean {
    return this.imageSelect == undefined || this.imageSelect == null || this.imageSelect == ''
  }

  isEnableButton(): boolean {
    return this.description == undefined || this.description == null || this.description == '' ||
      this.namePlace == null || this.namePlace == '' || this.namePlace == undefined || this.isImageSelect();
  }

  savePlace() {
    if (this.imageSelect) {
      this.params = this.params.set('description', this.description);
      this.params = this.params.set('name', this.namePlace);
      if (this.placeEditId == null) {
        this.trav.postSavePlace(this.imageSelectId, this.params).subscribe(
          (response) => {
            if (response != null) {
              Swal.fire(
                'Guardar',
                'Se Guardo Correctamente',
                'success'
              )
              this.restItems()
            }
          },
          (error) => {
            console.error('Error al obtener la imagen:', error);
          }
        );
      } else {
        this.trav.postEditPlace(this.placeEditId, this.imageSelectId, this.params).subscribe(
          (response) => {
            if (response != null) {
              Swal.fire(
                'Actualizar',
                'Se Actualizo Correctamente',
                'success'
              )
              this.router.navigate(['places']);
            }
          },
          (error) => {
            console.error('Error al obtener la imagen:', error);
          }
        );
      }

    }
  }

  getViewPlaceById() {
    this.route.paramMap.subscribe(params => {
      this.placeEditId = params.get('id')
      if (this.placeEditId != null) {
        this.trav.getLoadPlaceById(this.placeEditId).subscribe(
          (response) => {
            if (response != null) {
              this.description = response.description;
              this.namePlace = response.namePlace;
              this.imageSelect = response.idImage.url;
              this.imageSelectId = response.idImage.id;
              this.isEnableButton()
            }
          },
          (error) => {
            console.error('Error al obtener la imagen:', error);
          }
        );
      }

    });

  }

  restItems() {
    this.params = new HttpParams();
    this.namePlace = ''
    this.description = ''
    this.imageSelect = ''
    this.imageSelectId = ''
    this.isEnableButton()
  }



}
