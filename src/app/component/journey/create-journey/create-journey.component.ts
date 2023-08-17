import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicityModel } from 'src/app/models/publicity-model';
import { TravelsService } from 'src/app/services/travels.service';
import Swal from 'sweetalert2';
import { DatePickComponent } from '../../utils/date-pick/date-pick.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-journey',
  templateUrl: './create-journey.component.html',
  styleUrls: ['./create-journey.component.css']
})
export class CreateJourneyComponent implements OnInit {
  params = new HttpParams();
  description !: string;
  status !: string;
  count !: string;
  selectedTime !: PublicityModel
  placesList !: any[];
  btnDes: boolean = true;
  placesOriId !: string;
  placesOri !: any;
  placesDesId !: string;
  placesDes !: any;
  editId: any = '';
  statusList: any[] = ["activo", "cancelado", "expirado"]

  @ViewChild('date', { static: false }) date !: DatePickComponent;

  constructor(private travService: TravelsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getViewPlaceAll()
    this.getViewJourneyById();
  }

  onTimeChange(timeSelect: any) {
    this.selectedTime = timeSelect;
    this.onInputChange();
  }


  onInputChange() {
    this.btnDes = this.description == null || this.description == "" || this.status == null || this.count == null || this.selectedTime == null ||
      this.placesOriId == null || this.placesDesId == null || this.selectedTime.dateInit == undefined || this.selectedTime.dateEnd == undefined;
  }

  isImageSelectOri(): boolean {
    this.onInputChange();
    if (this.placesOriId) { this.placesOri = this.placesList.find(option => option.id == this.placesOriId); }
    return this.placesOri == undefined || this.placesOri == null || this.placesOri == ''
  }

  isImageSelectDes(): boolean {
    this.onInputChange();
    if (this.placesDesId) { this.placesDes = this.placesList.find(option => option.id == this.placesDesId); }
    return this.placesDes == undefined || this.placesDes == null || this.placesDes == ''
  }

  getViewPlaceAll() {
    this.travService.getLoadPlaceAll().subscribe(
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

  saveJourney() {
    this.params = this.params.set('status', this.status);
    this.params = this.params.set('description', this.description);
    this.params = this.params.set('count', this.count);
    this.params = this.params.set('dateInitial', this.selectedTime.dateInit);
    this.params = this.params.set('dateEnd', this.selectedTime.dateEnd);

    if (this.isEditValue()) {
      this.travService.postSaveJourney(this.placesOriId, this.placesDesId, this.params).subscribe(
        (response) => {
          if (response != null) {
            Swal.fire(
              'Guardar',
              'Se Guardo Correctamente',
              'success'
            )
            this.resetItem()
          }

        },
        (error) => {
          Swal.fire(
            'Error',
            error.error,
            'error'
          )
        }
      );
    } else {
      this.travService.putEditJourney(this.editId,this.placesOriId, this.placesDesId, this.params).subscribe(
        (response) => {
          if (response != null) {
            Swal.fire(
              'Actualizar',
              'Se Actualizo Correctamente',
              'success'
            )
            this.router.navigate(['journey']);
          }

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


  }

  getViewJourneyById() {
    this.route.paramMap.subscribe(params => {
      this.editId = params.get('id')
      if (this.editId) {
        this.travService.getLoadJourneyById(this.editId).subscribe(
          (response) => {
            if (response != null) {
              this.description = response.journey.description;
              this.status = response.journey.status;
              this.count! = response.journey.count;
              this.placesOriId! = response.placeOri.id;
              this.placesOri = response.placeOri;
              this.placesDesId = response.placeDes.id;
              this.placesDes = response.placeDes;
              this.selectedTime = new PublicityModel(
                response.journey.dateInitial,
                response.journey.dateEnd,
                "",
                "",
                true
              );
            }
            this.date.setDataEditInf(this.selectedTime)
          },
          (error) => {
            console.error('Error al obtener la imagen:', error);
          }
        );
      }

    });

  }



  isEditValue(): boolean {
    return this.editId == undefined || this.editId == null || this.editId == ''
  }

  resetItem() {
    this.params = new HttpParams();
    this.description = "";
    this.status = ""
    this.count! = ""
    this.date.getRest();
    this.btnDes = true;
    this.placesOriId! = ""
    this.placesOri = null;
    this.placesDesId = ""
    this.placesDes = null;
  }

}
