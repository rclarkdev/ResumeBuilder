import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BuildResumeService } from '../services/build-resume.service';

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.component.html',
  styleUrls: ['./choose-type.component.css', '../../stylesheets/common.css']
})

export class ChooseTypeComponent implements OnInit {

  constructor(
	private buildResumeService: BuildResumeService,
	private router: Router,
    private activeRoute: ActivatedRoute) {}

  ngOnInit() {}

  onKey(textField) {}

  chooseType(template) {
    var element = document.getElementById("RequiredResumeName");
    var resumeName = (<HTMLInputElement>document.getElementById("ResumeName")).value;
  
    if(element){
      if (!resumeName) {
        element.classList.remove("rc-validation");
      } else {
        element.classList.add("rc-validation");
        this.buildResumeService.setResumeName(resumeName);
        this.buildResumeService.setResumeType(template);	
        this.router.navigate(['../../build-resume', template], { relativeTo: this.activeRoute });
      }
    }
  }
}
