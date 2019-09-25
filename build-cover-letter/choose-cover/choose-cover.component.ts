import { Component, OnInit } from '@angular/core';
import { BuildCoverLetterService } from '../services/build-cover-letter.service';
import { SavedBlockService } from '../../content-wizard/services/saved-block.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChooseBlocksService } from '../../build-resume/services/choose-blocks.service';
import { ContentBlocks } from '../../shared/constants/constants';

@Component({
  selector: 'app-choose-cover',
  templateUrl: './choose-cover.component.html',
  styleUrls: ['./choose-cover.component.css', '../../stylesheets/common.css']
})
export class ChooseCoverComponent implements OnInit {

  private displayAnswers: boolean;
  private coverLetter: any;
  private selected: any;
  private answers: any;
  private section: any;
  private userForm: any;
  private index: any;
  private contactSectionId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private buildCoverLetterService: BuildCoverLetterService,
    private savedBlockService: SavedBlockService,
    private chooseBlocksService: ChooseBlocksService
  ) { }

  ngOnInit() {

    this.buildCoverLetterService.contentBlockObservable.subscribe(contentBlock => this.coverLetter = contentBlock);
    this.buildCoverLetterService.userFormObservable.subscribe(userForm => this.userForm = userForm);

    this.buildCoverLetterService.getCoverLettersForUser().subscribe((coverLetters) => {
      var coverLetterBlock = coverLetters.contentBlocks.filter(function (result) {
        return result.name === ContentBlocks.CoverLetter;
      });
      if(coverLetterBlock && coverLetterBlock.length)
        this.coverLetter = coverLetterBlock[0];
        this.buildCoverLetterService.setContentBlock(this.coverLetter);
    });
  }

  saveCoverLetter(event: Event) {
    this.buildCoverLetterService.saveCoverLetter(this.coverLetter, this.userForm).subscribe((result) => {
      if (result != null && result.success) {
        this.router.navigate(['../../saved-cover-letters'], { relativeTo: this.route });
      }
      else {
        this.router.navigate(['/home']);
      }
    });
  }

  selectCoverLetter(section, event) {

    this.selected = event.target.checked;
  
    if(section) {
      this.section = section;
      this.section.selected = this.selected;
      this.getSavedCoverLetter(section.id).then((response) => {
         this.chooseBlocksService.getUserContacts().subscribe((result) => {
          if(result.answers){
            var contactName = "";
            for(var i = 0; i < result.answers.length; i++){
              if(result.answers[i].section && result.answers[i].section.sectionId){
                if(this.contactSectionId == result.answers[i].section.sectionId) {
                  if(result.answers[i].name === "FirstName"){
                    contactName = result.answers[i].value;        
                  }
                  if(result.answers[i].name === "LastName") {
                    contactName += " " +result.answers[i].value;
                  }
                }
              }
            }
            this.answers[this.index].value = contactName.trim();
            this.displayAnswers = true;
          }
         });
       });
    }
  }

  getSavedCoverLetter(sectionId) {
    var promise = new Promise((resolve, reject) => {
      this.savedBlockService.getSavedContentBlock(sectionId).subscribe((result) => {
        
        if (result) {
          this.answers = result.answers.filter(function (result) {
            return result.componentName && result.value;
          });
          for (var i = 0; i < this.answers.length; i++) {
            this.answers[i].label = this.answers[i].componentName.replace(/([A-Z])/g, ' $1');
          }  
          for (var i = 0; i < this.answers.length; i++) {
            if( this.answers[i].componentName === "ContactInfo")
              this.contactSectionId = this.answers[i].value;
          }
          this.index = this.findWithAttr(this.answers, "componentName", "ContactInfo");
          this.answers[this.index].value = "";
        }         
        resolve(result);
      }, error => reject(error));
    });
    return promise;
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }
}
