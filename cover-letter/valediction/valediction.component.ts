import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-valediction',
  templateUrl: './valediction.component.html',
  styleUrls: ['./valediction.component.css']
})
export class ValedictionComponent implements OnInit {

  @Input() valediction: any;
  @Input() senderName: any;
  @Input() className: any;

  constructor() { }

  ngOnInit() {
  }

}
