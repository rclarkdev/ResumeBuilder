import { Component, OnInit } from '@angular/core';
import { SavedResumesService } from '../Services/saved-resumes.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saved-resumes',
  templateUrl: './saved-resumes.component.html',
  styleUrls: ['./saved-resumes.component.css', '../../stylesheets/common.css']
})
export class SavedResumesComponent implements OnInit {

  private savedResumes: any;

  constructor(
    private savedResumesService: SavedResumesService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.savedResumesService.getSavedResumes().subscribe((result) => {
      if (result != null) {
        this.spinnerService.hide();
        this.savedResumes = result.userForms;
      }
    });
  }

  deleteResume(resume) {
    this.spinnerService.show();
    this.savedResumesService.deleteResume(resume).subscribe((result) => {
      if (result.success) {
        this.savedResumesService.getSavedResumes().subscribe((result) => {
          this.spinnerService.hide();
          if (result != null) {
            this.savedResumes = result.userForms;
          }
        });
      }
    });
  }

  selectResume(resume) {
    this.router.navigate(['../preview-resume/'+resume.id], { relativeTo: this.activeRoute });
  }

}
