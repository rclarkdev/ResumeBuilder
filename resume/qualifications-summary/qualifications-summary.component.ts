import { Component, OnInit, Input } from '@angular/core';
import { SavedResumesService } from '../../print-preview/Services/saved-resumes.service';

@Component({
  selector: 'app-qualifications-summary',
  templateUrl: './qualifications-summary.component.html',
  styleUrls: ['./qualifications-summary.component.css']
})
export class QualificationsSummaryComponent implements OnInit {

  @Input() contentBlockQualifications: any;

  constructor() { }

  ngOnInit() {}
}
