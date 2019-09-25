import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ContentBlockGroupsService } from '../services/content-block-groups.service';
import { SavedBlockService } from '../services/saved-block.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentBlocks } from '../../shared/constants/constants';

@Component({
  selector: 'app-content-block-groups',
  templateUrl: './content-block-groups.component.html',
  styleUrls: ['./content-block-groups.component.css']
})
export class ContentBlockGroupsComponent implements OnInit {

  navUrl: any;
  navIcon: any = "fa fa-arrow-left";
  navText: any = "Go Back"; 
  contentBlockName: any;
  contentBlockGroups: any;
  contentBlockDescription: string;
  contentBlockSections: any;
  createCoverContact: any;
  
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private savedBlockService: SavedBlockService,
    private contentBlockGroupsService: ContentBlockGroupsService) { }

  ngOnInit() { 
    this.dataService.createCoverContactObservable.subscribe(createCoverContact => this.createCoverContact = createCoverContact);
    this.dataService.navUrlObservable.subscribe(url => this.navUrl = url);
    this.dataService.navIconObservable.subscribe(icon => this.navIcon = icon);
    this.dataService.navTextObservable.subscribe(text => this.navText = text);
    this.dataService.setHiddenBulletEntries([{}]);

    this.dataService.contentBlockNameObservable.subscribe(contentBlockName => this.contentBlockName = contentBlockName);
    this.route.params.subscribe(params => {
      this.contentBlockName = params['contentBlock'];

      if(this.contentBlockName === ContentBlocks.CoverLetter) {
        this.dataService.setNavUrl("/app/4/resumebuilder/home");
      } else {
        if(!this.createCoverContact)
          this.dataService.setNavUrl("/app/4/resumebuilder/content-blocks");
      }
      if(!this.createCoverContact)
        this.dataService.setNavButtonText("Go Back");
      this.dataService.setNavIcon("fa fa-arrow-left");
    });
    this.dataService.getNavMenuMobile(this.contentBlockName, null);
    this.contentBlockGroupsService.contentBlockGroupsObservable.subscribe(contentBlockGroups => this.contentBlockGroups = contentBlockGroups);

    this.contentBlockGroupsService.getContentBlockGroups(this.contentBlockName).subscribe((result) => {
      if (result) {
        this.contentBlockGroups = result.contentBlockGroups.contentBlockGroups;

        // Set sections for the current form
        this.contentBlockSections = result.contentBlockGroups.contentBlockSections;
        var contentBlockSectionsElement = document.getElementById("ContentBlockSections");
        if (this.contentBlockSections.length > 0) {
          this.savedBlockService.setContentBlockSections(this.contentBlockSections);
          if(contentBlockSectionsElement)
            contentBlockSectionsElement.classList.remove("hidden");
        } else {
          if(contentBlockSectionsElement)
            contentBlockSectionsElement.classList.add("hidden");
        }
      }
    });
  }
  selectGroup(group) {
    this.contentBlockGroupsService.setContentBlockGroup(group);
    this.router.navigate(['../../content-wizard', this.contentBlockName, group.id], { relativeTo: this.route });
  }
}
