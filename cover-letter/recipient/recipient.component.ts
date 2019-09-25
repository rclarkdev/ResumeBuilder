import { Component, OnInit, Input } from '@angular/core';
import { SavedResumesService } from '../../print-preview/Services/saved-resumes.service';
import { SavedCoverLettersService } from '../../print-preview/Services/saved-cover-letters.service';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {

  @Input() recipientName: any;
  @Input() recipientAddress: any;
  @Input() className: any;

  constructor() { }

  ngOnInit() {}
}