import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  @Input() intro: any;
  @Input() className: any;;
  
  constructor() { }

  ngOnInit() {
  }

}
