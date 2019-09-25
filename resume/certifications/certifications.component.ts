import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit {

  @Input() type: any;
  @Input() style: any;
  @Input() contentBlockCertifications: any;

  constructor() { }

  ngOnInit() {
  }

}
