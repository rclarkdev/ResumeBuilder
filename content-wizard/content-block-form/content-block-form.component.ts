import { Component, OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ContentBlockFormService } from '../services/content-block-form.service';
import { ContentBlockGroupsService } from '../services/content-block-groups.service';
import { SavedBlockService } from '../services/saved-block.service';
import { DataService } from '../../shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ContentBlocks } from '../../shared/constants/constants';

@Component({
  selector: 'app-content-block-form',
  templateUrl: './content-block-form.component.html',
  styleUrls: ['./content-block-form.component.css', '../../stylesheets/common.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class ContentBlockFormComponent implements OnInit {

  private count: number = 0;
  private addBullet: boolean;
  private handleData: boolean = true;
  private contentBlockRows: any;
  private contentBlockHeading: any;
  private contentBlockGroupHeading: any;
  private contentBlockSections: any;
  private contentBlockGroup: any;
  private contentBlockGroupId: any;
  private contentBlockIndex: any;
  private contentBlockList: any;
  private contentBlockSelectedSection: any;
  private contentBlockId: any;
  private otherStateProvinceVisible: any;
  private otherAwardVisible: any;
  private hiddenBulletEntries: any;
  private editorConfig: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private savedBlockService: SavedBlockService,
    private contentBlockGroupsService: ContentBlockGroupsService,
    private activeRoute: ActivatedRoute,
    private contentBlockFormService: ContentBlockFormService = null,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.dataService.hiddenBulletEntriesObservable.subscribe(entries => this.hiddenBulletEntries = entries);
    this.dataService.contentBlockIndexObservable.subscribe(contentBlockIndex => this.contentBlockIndex = contentBlockIndex);
    this.contentBlockGroupsService.contentBlockGroupObservable.subscribe(contentBlockGroup => this.contentBlockGroup = contentBlockGroup);
    
    this.route.params.subscribe(params => {

      let contentBlock = params['contentBlock'];
      this.contentBlockHeading = decodeURI(contentBlock);
      var element = document.getElementById("NextPrevComponent");
      if(element) {
        if(contentBlock !== ContentBlocks.CoverLetter){
          element.classList.remove("hide-until-page-loaded");
        } else {
            element.classList.add("hide-until-page-loaded");
        }
      }

      let groupId = params['contentBlockGroupId'];
      let sectionId = params['contentBlockSectionId'];

      this.contentBlockGroupsService.getContentBlockGroupById(groupId).subscribe((data) => {
        this.contentBlockGroupHeading = data.contentBlockGroup.name;
      });

      this.dataService.getNavMenuMobile(this.contentBlockHeading, null);

      this.contentBlockFormService.getContentBlockFormByGroup(this.contentBlockHeading, groupId, sectionId).subscribe((result) => {
        if (result != null) {
          this.contentBlockId = result.contentBlock.contentBlockId;
          this.contentBlockSelectedSection = result.contentBlock.selectedContentBlockSection;
          this.contentBlockRows = result.contentBlock.contentBlockRows;

          // Set sections for the current form
          this.contentBlockSections = result.contentBlock.contentBlockSections;
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
        this.spinnerService.hide();
      });
    });
  }

  handleBulletData(data){
    if(this.handleData){
      for(let i = 0; i < data.length; i++){
        for(let key of Object.keys(data[i])){
          if(key){
            let values = data[i][key].split("##");
            let id = key.replace("Hidden", "");
            let element = (<HTMLInputElement>document.getElementById(id));
            element.value = values[0];
            this.receiveAddBulletEvent(true, id+"Type"); // TODO: use EventEmitter
            for(let j = 1; j < values.length; j++){
              this.addElement(id);
              element = (<HTMLInputElement>document.getElementById(id+j));
              element.value = values[j];
            }
          }
        }
      }
      this.handleData = false;
    }
    return this.handleData;
  }

  receiveAddBulletEvent(event, id) {
    this.addBullet = event;
    let element = document.getElementById(id+'AddRemove');
    if(this.addBullet) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }
  
  addElement(entryType) {

    var id = entryType.replace("Type", "");
    var bulletEl = (<HTMLInputElement>document.getElementById(id+'_Bullet'));
    if(bulletEl && bulletEl.checked) {
      this.count++;
      let container = document.getElementById(id+'Container');
      let lastChild = container.lastChild;
      let cln = lastChild.cloneNode(true);
      let childEl = (<HTMLInputElement>cln.childNodes[0]);

      if(childEl) {
        if(childEl.id && isNaN(Number(childEl.id.slice(-1)))){
          this.count = 1;
        }
        childEl.id = id+this.count;
        childEl.value = "";
        container.appendChild(cln);       
      }
    }
    return false;
  }

  removeElement(entryType) {
    var id = entryType.replace("Type", "");
    let container = (<HTMLElement>document.getElementById(id+'Container'));
    let lastChild = container.lastChild;
    if(container.childNodes.length > 1) {
      //lastChild.remove();
      this.count--;
    }
    return false;
  }

  removeAllChildren(entryType) {
    this.count = 0;
    var id = entryType.replace("Type", "");
    let container = document.getElementById(id+'Container');
    for(let i = 1; i < container.children.length; i++) {
      container.children[i].remove();
    }
  }

  onSubmit(f) {
    
    this.contentBlockFormService.saveContentBlock(this.contentBlockRows).subscribe((result) => {
      this.spinnerService.hide();
      if (result != null && result.submitAnswerResult.success) {
        this.router.navigate(['/app/4/resumebuilder/content-block-groups', result.submitAnswerResult.contentBlockName], { relativeTo: this.activeRoute });
      }
      else {
        this.router.navigate(['/home']);
      }
    });
  }
}
