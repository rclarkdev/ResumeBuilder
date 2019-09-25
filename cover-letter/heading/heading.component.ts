import { Component, OnInit, Input } from '@angular/core';
import { SavedResumesService } from '../../print-preview/Services/saved-resumes.service';
import { SavedCoverLettersService } from '../../print-preview/Services/saved-cover-letters.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {


  @Input() senderName: any;
  @Input() className: any;

  constructor() { }

  ngOnInit() { }
}