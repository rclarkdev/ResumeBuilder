import { Component, OnInit, Input, AfterViewChecked, AfterContentChecked, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css']
})
export class DatetimeComponent implements AfterViewInit {

  @Input() id: string;
  @Input() value: string;
  @Input() index: string;
  @Input() required: boolean;
  
  constructor() { }

  ngAfterViewInit() {
    var dateElement = (<HTMLInputElement>document.getElementById(this.id));
    if(dateElement){
      dateElement.value = this.value;
    }
  }
}
