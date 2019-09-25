import { Component, OnInit, Input } from '@angular/core';
import { SavedResumesService } from '../../print-preview/Services/saved-resumes.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {

  @Input() resume: any;
  private contentBlock: any;
  private awards: any;

  constructor() {}
  ngOnInit() {}

}
