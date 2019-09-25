import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit {

  @Input() references: any;
  
  constructor() { }

  ngOnInit() {
  }

}
