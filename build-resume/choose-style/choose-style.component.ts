import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BuildResumeService } from '../services/build-resume.service';
import { ChooseBlocksService } from '../services/choose-blocks.service'; 

@Component({
  selector: 'app-choose-style',
  templateUrl: './choose-style.component.html',
  styleUrls: ['./choose-style.component.css']
})
export class ChooseStyleComponent implements OnInit {

  private name: any;
  private type: any;

  @Input() template: string;

  constructor(
    private buildResumeService: BuildResumeService,
    private chooseBlocksService: ChooseBlocksService, 
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.buildResumeService.typeObservable.subscribe(type => this.type = type);
    this.buildResumeService.resumeNameObservable.subscribe(name => this.name = name);
  }

  chooseStyle(style) {
    this.buildResumeService.setResumeStyle(style);
    
    this.buildResumeService.createUserForm(this.name, this.type, style).subscribe((result) => {
      if (result != null && result.userForm != null && result.userForm.id != 0) {
        this.buildResumeService.setUserForm(result.userForm);
        this.router.navigate(['../../build-resume', 'choose-blocks'], { relativeTo: this.activeRoute });
      }
      else {
        this.router.navigate(['../../build-resume', 'choose-type'], { relativeTo: this.activeRoute });
      }
    });
  }
}
