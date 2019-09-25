import { Component, OnInit, Input } from '@angular/core';
import { SavedResumesService } from '../../print-preview/Services/saved-resumes.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  @Input() type: any;
  @Input() style: any;
  @Input() contentBlockEducation: any;

  constructor() { }
  
    ngOnInit() {}

}
