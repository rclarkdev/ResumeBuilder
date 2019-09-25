import { Component, OnInit, Input } from '@angular/core';
import { SavedResumesService } from '../../print-preview/Services/saved-resumes.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() type: any;
  @Input() style: any;
  @Input() contentBlockExperience: any;

  constructor() { }

  ngOnInit() { }
}
