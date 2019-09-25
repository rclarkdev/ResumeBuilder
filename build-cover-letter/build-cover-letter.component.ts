import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildCoverLetterService } from './services/build-cover-letter.service';

@Component({
  selector: 'app-build-cover-letter',
  templateUrl: './build-cover-letter.component.html',
  styleUrls: ['./build-cover-letter.component.css', '../stylesheets/common.css']
})
export class BuildCoverLetterComponent implements OnInit {

  public template: string;

  constructor(private route: ActivatedRoute, private buildCoverLetterService: BuildCoverLetterService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.template = params['template'];
      });
  }
}