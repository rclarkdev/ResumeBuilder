import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-relevant-courses',
  templateUrl: './relevant-courses.component.html',
  styleUrls: ['./relevant-courses.component.css']
})
export class RelevantCoursesComponent implements OnInit {

  @Input() relevantCourses: any;
  
  constructor() { }

  ngOnInit() {
  }
}