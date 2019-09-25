import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content-blocks',
  templateUrl: './content-blocks.component.html',
  styleUrls: ['./content-blocks.component.css']
})
export class ContentBlocksComponent implements OnInit {

  private contentBlockList: any;
  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.dataService.contentBlockListObservable.subscribe(contentBlockList => this.contentBlockList = contentBlockList);
    this.dataService.getNavMenu();
  }
  
  selectMenuItem(menuItem) {    
    this.dataService.setCreateCoverContact(false);
    this.router.navigate([menuItem.route], { relativeTo: this.activeRoute });
  }
}