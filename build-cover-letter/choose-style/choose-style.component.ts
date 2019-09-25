import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BuildCoverLetterService } from '../services/build-cover-letter.service';

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
    private buildCoverLetterService: BuildCoverLetterService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.buildCoverLetterService.typeObservable.subscribe(type => this.type = type);
    this.buildCoverLetterService.coverLetterNameObservable.subscribe(name => this.name = name);
  }

  chooseStyle(style) {
    this.buildCoverLetterService.setCoverLetterStyle(style);
    this.buildCoverLetterService.createUserForm(this.name, this.type, style).subscribe((result) => {
      if (result != null && result.userForm != null && result.userForm.id != 0) {
        this.buildCoverLetterService.setUserForm(result.userForm);     
      }
      this.router.navigate(['../choose-cover'], { relativeTo: this.activeRoute });
    });
  }
}
