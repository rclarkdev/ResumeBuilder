import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SavedResumesService } from '../print-preview/Services/saved-resumes.service';
import { SavedCoverLettersService } from '../print-preview/Services/saved-cover-letters.service';
import { SavedBlockService } from '../content-wizard/services/saved-block.service';
import { ContentBlocks } from '../shared/constants/constants';

@Component({
  selector: 'app-cover-letter',
  templateUrl: './cover-letter.component.html',
  styleUrls: ['./cover-letter.component.css', '../stylesheets/common.css']
})
export class CoverLetterComponent implements OnInit {

  private coverLetter: any;
  private contentBlock: any;
  private coverLetterAnswers: any;
  private senderName: any;
  private recipientName: any;
  private recipientAddress: any;
  private intro: any;
  private body: any;
  private valediction: any;
  private type: any;
  private style: any;
  private coverLetterId: any;
  private cssUrl: any;
  private coverLetterDate: any;
  private hasIntro: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private savedCoverLettersService: SavedCoverLettersService,
    private savedResumesService: SavedResumesService,
    private savedBlockService: SavedBlockService
  ) { }

  getSavedCoverLetter(id) {
    return new Promise((resolve, reject) => {
      this.savedCoverLettersService.getSavedCoverLetter(id)
          .subscribe(result => {
            if (result) {
              this.savedCoverLettersService.setCoverLetter(result);
            }         
            resolve(result);
          }, error => reject(error));
    });
  }

  ngOnInit() {

    this.route.params.subscribe(
      params => {
        this.coverLetterId = params['id'];
      });

      var context = this;
      context.getSavedCoverLetter(context.coverLetterId).then((coverLetter) => {
        
        context.coverLetter = coverLetter;
        context.hasIntro = context.intro ? context.intro.trim().replace(/(<([^>]+)>)/ig,"") : false;
    
        context.cssUrl = '/assets/stylesheets/CoverLetter/cover.css';
        context.savedCoverLettersService.selectedCoverLetterObservable.subscribe(coverLetter => context.coverLetter = coverLetter);
        
        if (context.coverLetter.userForm.name == null) {
          context.router.navigate(['../../saved-cover-letters']);
        }
        else {
          context.type = context.coverLetter.userForm.template;
          context.style = context.coverLetter.userForm.style;
    
          if(context.type && context.style) {
            context.coverLetterId = context.type + context.style;
            context.className = context.className(context.coverLetterId);
          }
        }
        context.contentBlock = context.savedResumesService.getComponentContentBlock(context.coverLetter.userForm.contentBlocks, ContentBlocks.CoverLetter);
    
        if (context.contentBlock && context.contentBlock.sections) {
          if(context.contentBlock.sections.length){
            context.getCoverLetterAnswers();
          }
        }
      });
  } 
    getCoverLetterAnswers() {
      this.coverLetterDate = new Date();
      this.coverLetterAnswers = this.contentBlock.sections[0].section.answers;

      if(this.coverLetterAnswers) {
        for(var i = 0; i < this.coverLetterAnswers.length; i++) {

          if (this.coverLetterAnswers[i].componentName === "RecipientName") {
            this.recipientName = this.coverLetterAnswers[i].value;
          }  
          if (this.coverLetterAnswers[i].componentName === "RecipientAddress") {
            this.recipientAddress = this.coverLetterAnswers[i].value;
          }  
          if (this.coverLetterAnswers[i].componentName === "Intro") {
            this.intro = this.coverLetterAnswers[i].value;
          }  
          if (this.coverLetterAnswers[i].componentName === "Body") {
            this.body = this.coverLetterAnswers[i].value;
          }
          if (this.coverLetterAnswers[i].componentName === "Valediction") {
            this.valediction = this.coverLetterAnswers[i].value;
          }
  
          if (this.coverLetterAnswers[i].componentName == "ContactInfo") {
            var sectionId = this.coverLetterAnswers[i].value;
            this.savedBlockService.getSavedContentBlock(sectionId).subscribe((result) => {
              this.savedCoverLettersService.setHeadingAnswers(result.answers);
              for(var j = 0; j < result.answers.length; j++) {
                if(result.answers[j].name === "FirstName")
                  this.senderName = result.answers[j].value + " ";
                if(result.answers[j].name === "LastName")
                  this.senderName += result.answers[j].value;
              }
              this.filterCoverLetterAnswers();
            });
          }
        }
      }
    }
    filterCoverLetterAnswers(){
      this.coverLetterAnswers = this.coverLetterAnswers.filter(function (answer) {
        return answer.name != "ContactInfo";
      });
    }

    private className(Id){
      return Id
        .replace(/([A-Z][a-z])/g,' $1')
        .replace(/(\d)/g,' $1').trim()
        .replace(' ', '-').toLowerCase();
    }
  }
