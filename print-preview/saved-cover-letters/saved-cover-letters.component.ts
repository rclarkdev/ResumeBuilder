import { Component, OnInit } from '@angular/core';
import { SavedCoverLettersService } from '../Services/saved-cover-letters.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-saved-cover-letters',
  templateUrl: './saved-cover-letters.component.html',
  styleUrls: ['./saved-cover-letters.component.css', '../../stylesheets/common.css']
})
export class SavedCoverLettersComponent implements OnInit {

  private savedCoverLetters: any;

  constructor(
    private savedCoverLettersService: SavedCoverLettersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.savedCoverLettersService.getSavedCoverLetters().subscribe((result) => {
      if (result != null) {
        this.savedCoverLetters = result.userForms;
      }
    });
  }

  selectCoverLetter(coverLetter) {
    this.router.navigate(['../preview-cover/' + coverLetter.id], { relativeTo: this.activeRoute });
  }

  deleteCoverLetter(coverLetter) {
    this.savedCoverLettersService.deleteCoverLetter(coverLetter).subscribe((result) => {
      if (result.success) {
        this.savedCoverLettersService.getSavedCoverLetters().subscribe((result) => {
          if (result != null) {
            this.savedCoverLetters = result.userForms;
          }
        });
      }
    });
  }

}
