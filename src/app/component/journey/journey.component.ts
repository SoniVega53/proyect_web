import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelsService } from 'src/app/services/travels.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit{
 
  journeyList !: any[];
  

  constructor(private travService: TravelsService,private router: Router) { }

  ngOnInit(): void {
    this.getViewJourneyAll()
  }


  getViewJourneyAll() {
    this.travService.getLoadJourneyAll().subscribe(
      (response) => {
        if (response != null) {
          this.journeyList = response;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getDeleteJourneyId(id:string) {
    this.travService.getJourneyDeleteById(id).subscribe(
      (response) => {
        
        Swal.fire(
          'Eliminar',
          'Se elimino correctamente',
          'success'
        )
        this.getViewJourneyAll()
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

  isJourneyonUser():boolean{
    return this.journeyList?.length > 0;
  }

  navEdit(id: string) {
    this.router.navigate(['/journey/update/',id]);
  }
}
