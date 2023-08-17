import { DatePipe } from '@angular/common';
import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import { PublicityService } from 'src/app/services/publicity.service';
import Swal from 'sweetalert2';
import { DatePickComponent } from '../utils/date-pick/date-pick.component';
import { PublicityModel } from 'src/app/models/publicity-model';

@Component({
  selector: 'app-publicity',
  templateUrl: './publicity.component.html',
  styleUrls: ['./publicity.component.css']
})

export class PublicityComponent implements OnInit {
  publisities: any = [];
  imageSelect !: string;
  imageSelectId !: string;
  description: string = "";
  publicityEdit: any;
  botonDeshabilitado: boolean = true;
  desButtonEdit: boolean = true;
  selectedTime !: PublicityModel
  @ViewChild('date', { static: false }) date !: DatePickComponent;

  constructor(private pub: PublicityService) { }

  ngOnInit(): void {
    this.getViewPublicityAll()
  }


  savePublicity() {
    if (this.imageSelect) {
      this.pub.postSavePublicity(this.imageSelectId, this.description, this.selectedTime).subscribe(
        (response) => {
          if (response != null) {
            Swal.fire(
              'Guardar',
              'Se Guardo Correctamente',
              'success'
            )
            this.restItemsEdit()
            this.date.getRest()
            this.getViewPublicityAll();
          }
        },
        (error) => {
          console.error('Error al obtener la imagen:', error);
          this.restItemsEdit()
        }
      );
    }
  }


  editPublicity(publicityEdit: any) {
    this.publicityEdit = publicityEdit;
    this.description = publicityEdit.description

    this.selectedTime = new PublicityModel(
      this.publicityEdit.dateInitial,
      this.publicityEdit.dateEnd,
      this.publicityEdit.hourInitial,
      this.publicityEdit.hourEnd,
      true
    );


    this.onInputChangeEdit()
  }


  editPublicityAction() {
    if (this.imageSelectId == "" || this.imageSelectId == undefined) {
      this.imageSelectId = this.publicityEdit.idImage.id
    }

    if (this.publicityEdit) {
      this.pub.postEditPublicity(this.publicityEdit.id, this.imageSelectId, this.description, this.selectedTime).subscribe(
        (response) => {
          if (response != null) {
            Swal.fire(
              'Actualizar',
              'Se Actualizo Correctamente',
              'success'
            )
            this.restItemsEdit()
            this.getViewPublicityAll();
          
          }
        },
        (error) => {
          console.error('Error al obtener la imagen:', error);
          this.restItemsEdit()
        }
      );
    }
  }

  restItemsEdit() {
    this.imageSelect = ""
    this.publicityEdit = "";
    this.description = ""
    this.imageSelectId = "";
    this.selectedTime == null;
    this.onInputChange()
    this.onInputChangeEdit()
  }

  getViewPublicityAll() {
    this.pub.getLoadPublicityAll().subscribe(
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

  getDeletePubl(id: string) {
    this.pub.getDeleteById(id).subscribe(
      (response) => {
        Swal.fire(
          'Eliminar',
          'Se elimino correctamente',
          'success'
        )
        this.getViewPublicityAll()
      },
      (error) => {
        Swal.fire(
          'Error',
          error,
          'error'
        )
      }
    );
  }


  onTimeChange(timeSelect: any) {
    this.selectedTime = timeSelect;
    this.onInputChange();
  }
  onTimeChangeEdit(timeSelect: any) {
    this.selectedTime = timeSelect;
    this.onInputChangeEdit()
  }

  onImageChange(imageSelect: any) {
    this.imageSelect = imageSelect.url;
    this.imageSelectId = imageSelect.id;
    this.onInputChange();
  }

  isImageSelect(): boolean {
    return this.imageSelect == undefined || this.imageSelect == null || this.imageSelect == ''
  }

  onInputChange() {
    this.botonDeshabilitado = this.description.trim() === '' || this.isImageSelect() || this.selectedTime == null ||
      this.selectedTime.dateInit == undefined || this.selectedTime.dateEnd == undefined || this.selectedTime.isActive;
  }

  onInputChangeEdit() {
    this.desButtonEdit = this.description.trim() === '' ||
      this.selectedTime.dateInit == undefined || this.selectedTime.dateEnd == undefined;
  }

}

