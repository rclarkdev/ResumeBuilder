import { Component, OnChanges, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'ic-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnChanges, OnInit {

  @Input() percentComplete: number;
  @Input() name: string;
  @Output() notify: EventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(): void {
      var padding = 100 - this.percentComplete;
      var progressBarElement = document.getElementById("ProgressBar");
      progressBarElement.style.padding = "0px " + padding + "% 0 0";
  }

  nextBlock(e): void {
    
  }
}
