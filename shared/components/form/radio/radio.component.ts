import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  @Input() id: string;
  @Input() radioButton: {};
  @Input() index: string;
  @Input() required: boolean;
  @Output() addBullet = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit() {

    let entryType = "";
    let element = (<HTMLInputElement>this.radioButton);
    if(element.value) {
      let entry = element.value.split('_');
      if (entry.length > 1) {
        entryType = entry[1];
        if(entryType === "Bullet") {
          // TODO: need to fix this so the buttons show up on init. For some reason element is null in "receiveAddBulletEvent"
          /*
          this.addBullet.emit(true);
           */
        }
      }
    }
  }

  selectRadio(event) {
    let entryType = "";
    let selection = event.target;
    if(selection && selection.id){
      let entry = selection.id.split('_');
      if (entry.length > 1) {
        entryType = entry[1];
        if(entryType === "Bullet") {
          this.addBullet.emit(true);
        } else {
          this.addBullet.emit(false);
        }
        let container = document.getElementById(entry[0] + "Container");
        let firstChild = container.firstChild
        container.innerHTML = '';
        container.appendChild(firstChild);
      } 
    }   
  }
}
