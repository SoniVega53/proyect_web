import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-select',
  templateUrl: './card-select.component.html',
  styleUrls: ['./card-select.component.css']
})
export class CardSelectComponent {

  @Input() svg:any = 1
  @Input() title:string = ""
  @Input() description:string = ""

  @Input() click():any{

  }
}
