import { Component, OnInit, Input } from '@angular/core';
import { SavedResumesService } from '../../print-preview/Services/saved-resumes.service';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit {

  @Input() type: any;
  @Input() style: any;
  @Input() objective: any;

  constructor() { }

  ngOnInit() { }
}

