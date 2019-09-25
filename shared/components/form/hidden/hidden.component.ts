import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-hidden',
  templateUrl: './hidden.component.html',
  styleUrls: ['./hidden.component.css']
})
export class HiddenComponent implements OnInit {

  @Input() id: any;
  @Input() name: any;
  @Input() value: any;
  private hiddenBulletEntries: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.hiddenBulletEntriesObservable.subscribe(entries => this.hiddenBulletEntries = entries);
    if(this.name.includes("EntryHidden") && this.value) {
      var entry = {};
      entry[this.name] = this.value;
      this.hiddenBulletEntries.push(entry);
      this.dataService.setHiddenBulletEntries(this.hiddenBulletEntries);
    }
  }
}