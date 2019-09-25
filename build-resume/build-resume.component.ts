import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-build-resume',
  templateUrl: './build-resume.component.html',
  styleUrls: ['./build-resume.component.css', '../stylesheets/common.css']
})
export class BuildResumeComponent implements OnInit {

  public template: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.template = params['template'];
      });
  }
}