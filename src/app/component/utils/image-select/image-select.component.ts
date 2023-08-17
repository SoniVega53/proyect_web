import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PublicityModel } from 'src/app/models/publicity-model';
import { ImageService } from 'src/app/services/image.service';
import { PublicityService } from 'src/app/services/publicity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.css']
})
export class ImageSelectComponent implements OnInit {
  imageAll: any = [];
  selectedImage: any;
  imageSelect!: string;
  imageSelectId!: string;
  params = new HttpParams();

  @Output() imageSelectOut = new EventEmitter<any>();
  @Input() type !: string

  constructor(private pub: PublicityService, private img: ImageService) {

  }
  ngOnInit(): void {
    this.getViewImageAll()
  }

  onChange() {
    const body = {
        'url': this.imageSelect,
        'id': this.imageSelectId
    }

    this.imageSelectOut.emit(body);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Aquí puedes acceder a los datos del archivo seleccionado
      const fileSizeInMB = file.size / (1024 * 1024); // Convertir bytes a MB
      const maxSizeInMB = 1; // Tamaño máximo permitido en MB

      if (fileSizeInMB > maxSizeInMB) {
        Swal.fire(
          'Error',
          'El archivo seleccionado es demasiado grande. Por favor, selecciona un archivo de máximo 1MB.',
          'error'
        )
        // Puedes realizar otras acciones aquí, como limpiar el input o mostrar un mensaje de error en la interfaz.
        this.selectedImage = ""
        return;
      } else {
        this.params = this.params.set('name', file.name);
        this.readImageFile(file);
      }


    }


  }

  readImageFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const imageDataURL = e.target.result;
      this.params = this.params.set('base64', imageDataURL);
    };
    reader.readAsDataURL(file);
  }

  saveImage() {
    if (this.selectedImage) {
      this.img.postSaveImageBase64(this.params, this.type).subscribe(
        (response) => {
          if (response != null) {
            this.imageSelect = response.url
            this.imageSelectId = response.id
            this.params = new HttpParams();
            this.selectedImage = ""
            this.onChange();
            this.getViewImageAll()
          }
        }
      );

    } else {
      Swal.fire(
        'Error',
        'Seleccione Una imagen',
        'error'
      )
    }
  }

  getViewImageAll() {
    this.img.getLoadImagenType(this.type).subscribe(
      (response) => {
        if (response != null) {
          this.imageAll = response;
        }
      },
      (error) => {
        console.error('Error al obtener la imagen:', error);
      }
    );
  }


  selectImage(selec: any) {
    this.imageSelect = selec.url;
    this.imageSelectId = selec.id;
    this.onChange();
  }

  deleteImage(selec: any) {
    this.img.getDeleteImageById(selec.id).subscribe(
      (response: string) => {
        if (response) {
          if (response != "EXPECTATION_FAILED") {
            Swal.fire(
              'Eliminar',
              'Se elimino correctamente',
              'success'
            )
            
            if (selec.url == this.imageSelect ) {
              this.imageSelect = ''
              this.imageSelectId = ''
              
            }    
            this.getViewImageAll()
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error Imagen en uso',
              showConfirmButton: false,
              timer: 1500
            })
          }
          this.onChange();
        }

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




}
