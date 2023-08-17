import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PublicityModel } from 'src/app/models/publicity-model';

@Component({
  selector: 'app-date-pick',
  templateUrl: './date-pick.component.html',
  styleUrls: ['./date-pick.component.css']
})
export class DatePickComponent implements OnInit{

  selectedDateInit: string = '';
  selectedDateEnd: string = '';
  hourInit: string = '';
  hourEnd: string = '';
  publicity !: PublicityModel

  @Input() publicityEdit !: PublicityModel
  @Input() isTime : boolean = true
  @Output() timeChange = new EventEmitter<PublicityModel>();

  constructor() {
    this.onChange()
  }

  onChange() {
    this.publicity = new PublicityModel(
      this.selectedDateInit,
      this.selectedDateEnd,
      this.hourInit,
      this.hourEnd,
      this.hourInit == "" || this.hourEnd == "" ? true : false
    );

    this.timeChange.emit(this.publicity);
  }



  ngOnInit(): void {
    this.setDataEdit()
  }

  getRest() {
    this.selectedDateInit = '';
    this.selectedDateEnd = '';
    this.hourInit = '';
    this.hourEnd = '';  
  }

  setDataEdit() {
    if (this.publicityEdit) {
      this.selectedDateEnd = this.publicityEdit.dateEnd;
      this.selectedDateInit = this.publicityEdit.dateInit;
      this.hourInit = this.publicityEdit.hourInit;
      this.hourEnd = this.publicityEdit.hourEnd;
      
    }
  }

  setDataEditInf(publicityEdit:PublicityModel) {
    this.selectedDateEnd = publicityEdit.dateEnd;
    this.selectedDateInit = publicityEdit.dateInit;
    this.hourInit = publicityEdit.hourInit;
    this.hourEnd = publicityEdit.hourEnd;
  }

}
