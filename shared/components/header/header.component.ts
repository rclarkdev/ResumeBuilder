import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { BuildResumeService } from '../../../build-resume/services/build-resume.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  defaultHeaderText: any;
  currentHeaderText: any;
  resumeType: any;
  resumeStyle: any;

  constructor(private dataService: DataService, private buildResumeService: BuildResumeService) { }

  ngOnInit() {
    this.dataService.defaultHeaderMessageObservable.subscribe(defaultHeaderText => this.defaultHeaderText = defaultHeaderText)
    this.dataService.currentHeaderMessageObservable.subscribe(currentHeaderText => this.currentHeaderText = currentHeaderText)
    this.buildResumeService.typeObservable.subscribe(resumeType => this.resumeType = resumeType)
    this.buildResumeService.styleObservable.subscribe(resumeStyle => this.resumeStyle = resumeStyle)
  }
}
