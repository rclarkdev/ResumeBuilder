import { Component, OnInit, Input, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;
  @Input() value: string = "";
  @Input() type: string;
  @Input() index: string;
  @Input() border: string;
  @Input() placeholder: string = "";
  @Input() required: boolean;

  constructor() { }
  
  ngOnInit() {
   
      this.placeholder = this.placeholder ? this.placeholder : "";
      var otherAwardField = (<HTMLInputElement>document.getElementById("OtherAwardField"));
      var otherAwardHidden = (<HTMLInputElement>document.getElementById("OtherAwardHidden"));
  
      var otherStateProvinceField = (<HTMLInputElement>document.getElementById("OtherStateProvinceField"));
      var stateProvinceHidden = (<HTMLInputElement>document.getElementById("StateProvinceHidden"));
      
      if(otherAwardField && otherAwardHidden)
        otherAwardField.value = otherAwardHidden.value;
  
      if(otherStateProvinceField && stateProvinceHidden)
        otherStateProvinceField.value = stateProvinceHidden.value;

      
  }
}