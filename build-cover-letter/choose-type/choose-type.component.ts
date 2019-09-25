import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BuildCoverLetterService } from '../services/build-cover-letter.service';

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.component.html',
  styleUrls: ['./choose-type.component.css', '../../stylesheets/common.css']
})
export class ChooseTypeComponent implements OnInit {

  constructor(
    private buildCoverLetterService: BuildCoverLetterService,
    private router: Router,
    private activeRoute: ActivatedRoute) {}
  
    ngOnInit() {}
  
    onKey(textField) {}
  
    chooseType(template) {
      var element = document.getElementById("RequiredCoverLetterName");
      var coverLetterName = (<HTMLInputElement>document.getElementById("CoverLetterName")).value;

      if(element){
        if (!coverLetterName) {
          element.classList.remove("rc-validation");
        } else {
          element.classList.add("rc-validation");
          this.buildCoverLetterService.setCoverLetterName(coverLetterName);
          this.buildCoverLetterService.setCoverLetterType(template);	
          this.router.navigate(['../../build-cover-letter', template], { relativeTo: this.activeRoute });
        }
      }
    }
  }
  