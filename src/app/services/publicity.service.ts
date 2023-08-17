import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicityService extends BaseServiceService {

  getLoadPublicityAll(): Observable<any> {
    return this.getService(`viewPublicity`);
  }
  getLoadPublicityAllDate(): Observable<any> {
    return this.getService(`viewPublicityDate`);
  }

  getDeleteById(id: string): Observable<any> {
    return this.getService(`deletePublicity/${id}`);
  }

  postSavePublicity(id:string,des: string,selectedTime:any): Observable<any> {
    let params = new HttpParams();
    params = params.set('description', des); 
    params = params.set('dateInit', selectedTime.dateInit); 
    params = params.set('dateEnd', selectedTime.dateEnd); 
    params = params.set('hourInit', selectedTime.hourInit); 
    params = params.set('hourEnd', selectedTime.hourEnd); 
    params = params.set('type', "an"); 

    return this.postServiceParams(`publicitySave/${id}`, null,params);
  }

  postEditPublicity( id:string, idImage:string,des: string,selectedTime:any): Observable<any> {
    let params = new HttpParams();
    params = params.set('description', des); 
    params = params.set('dateInit', selectedTime.dateInit); 
    params = params.set('dateEnd', selectedTime.dateEnd); 
    params = params.set('hourInit', selectedTime.hourInit); 
    params = params.set('hourEnd', selectedTime.hourEnd); 
    params = params.set('type', "an"); 


    return this.putServiceParams2(`publicitySave/${id}/${idImage}`, null,params);
  }
}
