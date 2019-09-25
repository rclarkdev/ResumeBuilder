import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../../services/data.service"
import { ContentBlockGroupsService } from '../../../content-wizard/services/content-block-groups.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SavedBlockService } from '../../../content-wizard/services/saved-block.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent {

  private navMenu: any;
  private navTypes: any;
  private contentBlockList: any;
  private contentBlockListMobile: any;
  private contentBlockGroups: any;
  private contentBlockSections: any;

  constructor(
    private router: Router,
    private http: HttpClient, 
    private dataService: DataService, 
    private contentBlockGroupsService: ContentBlockGroupsService,
    private savedBlockService: SavedBlockService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.navMenuObservable.subscribe(navMenu => this.navMenu = navMenu);
    this.dataService.navTypesObservable.subscribe(navTypes => this.navTypes = navTypes);
    this.dataService.contentBlockListObservable.subscribe(contentBlockList => this.contentBlockList = contentBlockList);
    this.dataService.contentBlockListMobileObservable.subscribe(contentBlockListMobile => this.contentBlockListMobile = contentBlockListMobile);
    this.dataService.getNavTypes(); 
    this.dataService.getNavMenu();
    this.dataService.getNavMenuMobile(null, null);
  }

  selectNavItem(route, contentBlockName, selectedNavType) {
    this.contentBlockGroupsService.setContentBlockGroups({});
    this.dataService.contentBlockListObservable.subscribe(contentBlockList => this.contentBlockList = contentBlockList);
    this.dataService.contentBlockListMobileObservable.subscribe(contentBlockListMobile => this.contentBlockListMobile = contentBlockListMobile);
    this.dataService.setContentBlockName(contentBlockName);
    this.dataService.setSelectedNavType(selectedNavType);
    this.dataService.getNavMenu();

    var index = this.findWithAttr(this.contentBlockList, 'name', contentBlockName);
    if(index !== -1) {
      this.dataService.setContentBlockIndex(index);
    }
    this.contentBlockGroupsService.getContentBlockGroups(contentBlockName).subscribe((result) => {
      if (result) {
        this.contentBlockGroups = result.contentBlockGroups.contentBlockGroups;

        this.contentBlockGroupsService.setContentBlockGroups(this.contentBlockGroups);

        // Set sections for the current form
        this.contentBlockSections = result.contentBlockGroups.contentBlockSections;
        var contentBlockSectionsElement = document.getElementById("ContentBlockSections");
        if (contentBlockSectionsElement) {
          if (this.contentBlockSections.length > 0) {
            this.savedBlockService.setContentBlockSections(this.contentBlockSections);
            contentBlockSectionsElement.classList.remove("hidden");
          } else {
            contentBlockSectionsElement.classList.add("hidden");
          }
        }
      }
    });
    this.router.navigate([ route ], { relativeTo: this.activeRoute });
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }
}
