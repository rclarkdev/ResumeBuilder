import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SavePrintExportService } from '../Services/save-print-export-service';
import { SavedResumesService } from '../Services/saved-resumes.service';
import { SavedCoverLettersService } from '../Services/saved-cover-letters.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-save-print-export',
  templateUrl: './save-print-export.component.html',
  styleUrls: ['./save-print-export.component.css', '../../stylesheets/common.css'],
  encapsulation: ViewEncapsulation.None
})
export class SavePrintExportComponent implements OnInit {

  private userForm: any;
  private styleSheet: any;
  private cssText: any;

  @Input() routeName: any;

  constructor(
    private savePrintExportService: SavePrintExportService,
    private savedResumeService: SavedResumesService,
    private savedCoverLetterService: SavedCoverLettersService,
    private router: Router
  ) { }

  ngOnInit() {
    var url = window.location.pathname;
    var component = url.substring(url.lastIndexOf('/')+1);
    

    if(component === "preview-resume") {
      this.savedResumeService.selectedResumeObservable.subscribe(userForm => this.userForm = userForm);
      this.savedResumeService.getResumeCSS().subscribe((result) => {
        this.cssText = result;
      });
    } else {
      this.savedCoverLetterService.selectedCoverLetterObservable.subscribe(userForm => this.userForm = userForm);
      this.savedResumeService.getCoverCSS().subscribe((result) => {
        this.cssText = result;
      });
    }
  }

  saveAndExportPdf() {
    var html = "";
    var resumeElement = document.getElementById('ResumeContainer');
    var coverElement = document.getElementById('CoverLetter');
    if(resumeElement) {
      html = resumeElement.innerHTML;
    }
    if(coverElement) {
      html = coverElement.innerHTML;
    }

    var resumeHtmlCss = "<html><head><style>" + this.cssText + "</style></head><body>" + html + "</body></html>"
    this.savePrintExportService.exportPdf(this.userForm.userForm.id, resumeHtmlCss);
  }

  saveAndExportWord() {
    var html = "";
    var resumeElement = document.getElementById('ResumeContainer');
    var coverElement = document.getElementById('CoverLetter');
    if(resumeElement) {
      html = resumeElement.innerHTML;
    }
    if(coverElement) {
      html = coverElement.innerHTML;
    }
    this.styleSheet = document.styleSheets[document.styleSheets.length - 1];

    var cssText = "";  
    for (var i = 0; i < this.styleSheet.cssRules.length; i++) {
      var rule = this.styleSheet.cssRules[i].cssText;
      cssText += rule;
    }

    var resumeHtmlCss = "<html><head><style>" + cssText + "</style></head><body>" + html + "</body></html>"
    this.savePrintExportService.exportWord(this.userForm.userForm.id, resumeHtmlCss);
  }
}
