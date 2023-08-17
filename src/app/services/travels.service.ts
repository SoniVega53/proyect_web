import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TravelsService  extends BaseServiceService{

  /**
   * PLACES
   */
  getLoadPlaceAll(): Observable<any> {
    return this.getService(`viewPlace`);
  }

  getLoadPlaceById(id: string): Observable<any> {
    return this.getService(`viewPlace/${id}`);
  }

  postSavePlace(id:string,params:HttpParams): Observable<any> {
    return this.postServiceBodyImage(`placeSave/${id}`, params);
  }

  postEditPlace(id:string,idImage:string,params:HttpParams): Observable<any> {
    return this.putServiceBodyImage(`placeSave/${id}/${idImage}`, params);
  }

  getDeleteById(id: string): Observable<any> {
    return this.getServices(`deletePlace/${id}`);
  }

  /**
   * Journey
  */
  getLoadJourneyAll(): Observable<any> {
    return this.getService(`viewJourneyHasPlacesAll`);
  }

  getLoadJourneyById(id: string): Observable<any> {
    return this.getService(`viewJourneyHasPlaces/${id}`);
  }


  getJourneyDeleteById(id: string): Observable<any> {
    return this.getServices(`deleteJourneyHasPlace/${id}`);
  }

  postSaveJourney(idPlaceOri:string,idPlaceDes:string,params:HttpParams): Observable<any> {
    return this.postService(`SaveJourneyHasPlace/${idPlaceOri}/${idPlaceDes}`, params);
  }

  putEditJourney(id:string,idPlaceOri:string,idPlaceDes:string,params:HttpParams): Observable<any> {
    return this.putServiceBody(`SaveJourneyHasPlace/${id}/${idPlaceOri}/${idPlaceDes}`, params);
  }

  //Reservation
  getLoadReservationById(idJourney:string): Observable<any> {
    return this.getService(`reservations/${idJourney}`);
  }
  getLoadReservationAll(): Observable<any> {
    return this.getService(`reservations`);
  }
}
