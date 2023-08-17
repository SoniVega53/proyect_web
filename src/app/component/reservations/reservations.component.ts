import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelsService } from 'src/app/services/travels.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  btnDes: boolean = true;
  journeyDesId !: string;
  placesDes !: any;
  journeyList !: any[];
  reservationList !: any[];
  reservation !: any[] ;


  constructor(private travService: TravelsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getViewJourneyAll()
    this.getViewReservationy()
  }


  isImageSelectDes(): boolean {
    if (this.journeyDesId) { 
      const body = this.journeyList.find(option => option.journey.id == this.journeyDesId)
      this.placesDes = body.placeDes
      
      const bodyRes = this.reservationList.filter(option => option.journey.id == this.journeyDesId)
      if(bodyRes){this.reservation = bodyRes}
      else {this.reservation = []}
           
    }
    return this.placesDes == undefined || this.placesDes == null || this.placesDes == ''
  }

  getViewJourneyAll() {
    this.travService.getLoadJourneyAll().subscribe(
      (response) => {
        if (response != null) {
          this.journeyList = response;
          
        }
      },
      (error) => {
        console.error('Error al obtener la imagen:', error);
      }
    );
  }

  getViewReservationy() {
    this.travService.getLoadReservationAll().subscribe(
      (response) => {
        if (response != null) {
          this.reservationList = response;
        }
      },
      (error) => {
        console.error('Error al obtener la imagen:', error);
      }
    );
  }

  isReservationUser():boolean{
    return this.reservation?.length > 0;
  }

}
