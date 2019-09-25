import { Component, OnInit, ViewChild, EventEmitter, ComponentRef, VERSION, ViewContainerRef, ComponentFactoryResolver, ViewEncapsulation } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ChooseBlocksService } from '../services/choose-blocks.service';
import { BuildResumeService } from '../services/build-resume.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentBlocks } from '../../shared/constants/constants';

@Component({
  selector: 'app-choose-blocks',
  templateUrl: './choose-blocks.component.html',
  styleUrls: ['./choose-blocks.component.css', '../../stylesheets/common.css']
})

export class ChooseBlocksComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

  private userForm: any;
  private counter: number = 1;
  private index: number;
  private type: string;
  private style: string;
  private userContentBlocks: any[];
  private block: any;
  private contactInfo: any;
  private contentBlock: any;
  private componentArray = [];
  private subscriptions = [];
  private contactInfoSelected: boolean;

  constructor(
    private router: Router,
    private buildResumeService: BuildResumeService,
    private chooseBlocksService: ChooseBlocksService,
    private resolver: ComponentFactoryResolver,
    private vcRef: ViewContainerRef,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  ngOnInit() {
    this.buildResumeService.userFormObservable.subscribe(userForm => this.userForm = userForm);
    this.buildResumeService.typeObservable.subscribe(type => this.type = type);
    this.buildResumeService.styleObservable.subscribe(style => this.style = style);
    this.chooseBlocksService.contactInfoSelectedObservable.subscribe(selected => this.contactInfoSelected = selected);

    this.chooseBlocksService.getContentBlocksForUser().subscribe((data) => {
      if (data != null) {

        this.userContentBlocks = data.contentBlocks.filter(function (result) {
          return result.name !== ContentBlocks.CoverLetter;
        });
        this.chooseBlocksService.setContentBlocks(this.userContentBlocks);

        for (var i = 0; i < this.userContentBlocks.length; i++) {
          if(this.userContentBlocks[i].name === ContentBlocks.ContanctInfo) {
            this.contactInfo = this.userContentBlocks[i];
          } else {
            this.add(this.userContentBlocks[i]);
          }
          
        }
        this.chooseBlocksService.setUserContentBlocks(this.userContentBlocks);
      }
    });
  }

  saveResume(event: Event) {
    if(!this.contactInfoSelected){
      document.getElementById('RequiredContactInfo').classList.remove('rc-validation');
    } else {
      this.chooseBlocksService.saveResume(this.userContentBlocks, this.userForm).subscribe((result) => {
        if (result != null && result.success) {
          this.router.navigate(['../../saved-resumes'], { relativeTo: this.route });
        }
        else {
          this.router.navigate(['/home']);
        }
      });
    }
  }

  add(block) {

    this.block = block;
    const factory = this.resolver.resolveComponentFactory(DynamicComponent);
    const componentRef = this.vcRef.createComponent(factory);
    const component = componentRef.instance;

    component.currentIndex = this.counter++;
    component.numBlocks = this.userContentBlocks.length;
    component.block = block;
    component.blocks = this.userContentBlocks;
    component.selected = block.selected;
    component.name = block.name;
    component.modal = this.modal;

    this.subscriptions.push(component.move.subscribe((shift: number) => {
      this.move(shift, componentRef);
    }));
    this.componentArray.push(component);
  }

  move(shift: number, componentRef: ComponentRef<any>) {
    const currentIndex = this.vcRef.indexOf(componentRef.hostView);
    const len = this.vcRef.length;

    let destinationIndex = currentIndex + shift;
    if (destinationIndex === len) {
      destinationIndex = 0;
    }
    if (destinationIndex === -1) {
      destinationIndex = len - 1;
    }

    var temp = this.userContentBlocks[destinationIndex+1];

    if (destinationIndex == 0) {
      if (shift > 0) {
        this.userContentBlocks = this.shiftRight(this.userContentBlocks, 1)
      } else {
        this.userContentBlocks = this.userContentBlocks.concat(this.userContentBlocks.splice(0, 1));
      }

    } else {
      this.userContentBlocks[destinationIndex+1] = this.userContentBlocks[currentIndex+1];
      this.userContentBlocks[currentIndex+1] = temp;
    }

    this.vcRef.move(componentRef.hostView, destinationIndex);
  }

  shiftRight(arr, places) {
    for (var i = 0; i < places; i++) {
      arr.unshift(arr.pop());
    }
    return arr;
  }

  receiveMessage($event) {
    this.userContentBlocks[this.index] = $event
  }

  getBlockSections(block, e, chosenBlockIndex) {
    var userBlockComponent = (<HTMLInputElement>document.getElementById("ContentBlock" + chosenBlockIndex));

    this.getSections(block, e);
    block.selected = true;

    var contentBlockName = <HTMLInputElement>document.getElementById("ContentBlockName");
    var sectionsComponent = (<HTMLElement>document.getElementById("AddSectionsComponent"));
    sectionsComponent.classList.remove("hidden");

    this.chooseBlocksService.setChosenContentBlockName(contentBlockName);
    this.chooseBlocksService.setCurrentContentBlockIndex(chosenBlockIndex);

    if(contentBlockName) {
      contentBlockName.innerHTML = userBlockComponent.innerText;
    }
    
    contentBlockName.classList.add("content-block-title"); 
  }
  getSections(block, e: MouseEvent) {
    e.stopPropagation();
    this.chooseBlocksService.getContentBlockSections(block);
  }
}

@Component({
  template: `
  <div class="container">
    <div class="row">
      <div class="col-5">
        <h4 class="block-title" id="ContentBlock{{currentIndex}}" >
          <b>
            <a href="javascript:void(0)"><span id="BlockName{{currentIndex}}" (click)="getBlockSections(block, $event, currentIndex)" >{{ block.name }}</span></a>
          </b>
        </h4>
      </div>

        <div class="col button-container" style="margin-right: -15px">
          <button (click)="move.emit(-1)" class="block-up">
            &#x25B2;
          </button>
        </div>
        <div class="col button-container">
          <button (click)="move.emit(1)" class="block-down">
          &#x25BC;
          </button>
        </div>  

      <div class="col button-container rename">
        <button class="btn btn-success" (click)="openModal(modal, name, currentIndex, block, $event)" *ngIf="!hideActions">
          {{ 'BUTTON.RENAME' | translate }}
        </button>
      </div>
      <div *ngFor="let section of block.sections" style="width:100%;">
        <div *ngIf="section.selected" class="block-sections" id="BlockSections{{block.id}}">
          <span class="section-name"><b>&nbsp;&nbsp;<u>{{section.name}} - {{section.groupName}}</u></b></span>
          <div class="answers-container">
            <div *ngFor="let answer of section.answers">
              <p *ngIf="
                answer.componentName !== 'Awarded' && 
                answer.componentName !== 'OtherAwardHidden' &&
                answer.componentName !== 'StateProvince' && 
                answer.componentName !== 'StateProvinceHidden'">
                <b>{{answer.label}}:</b>&nbsp;<span [innerHTML]="answer.value"></span>
              </p>            
              <p *ngIf="answer.componentName === 'OtherAwardHidden' "><b>{{ 'CAPTION.AWARDED' | translate }}:</b>&nbsp;<span [innerHTML]="answer.value"></span></p>
              <p *ngIf="answer.componentName === 'StateProvinceHidden' "><b>{{ 'CAPTION.STATE_PROVINCE' | translate }}:</b>&nbsp;<span [innerHTML]="answer.value"></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./choose-blocks.component.css']
})
export class DynamicComponent implements OnInit {
  name: string;
  selected: boolean;
  currentIndex: number;
  numBlocks: number;
  block: any;
  blocks: any;
  type: string;
  style: string;
  class: string;
  modal: ModalComponent;
  move = new EventEmitter();
  hideActions: boolean;

  constructor(
    private chooseBlocksService: ChooseBlocksService
  ) { }

  ngOnInit() {

      if(this.type && this.style) {
        let classParts = this.type + this.style;
        this.class = this.className(classParts);
      }
  }

  getSections(block, e: MouseEvent) {
    e.stopPropagation();
    this.chooseBlocksService.getContentBlockSections(block);
  }

  getBlockSections(block, e, chosenBlockIndex) {

    var userBlockComponent = (<HTMLInputElement>document.getElementById("ContentBlock" + chosenBlockIndex));

    this.getSections(block, e);
    block.selected = true;

    var contentBlockName = <HTMLInputElement>document.getElementById("ContentBlockName");
    var sectionsComponent = (<HTMLElement>document.getElementById("AddSectionsComponent"));
    sectionsComponent.classList.remove("hidden");

    this.chooseBlocksService.setChosenContentBlockName(contentBlockName);
    this.chooseBlocksService.setCurrentContentBlockIndex(chosenBlockIndex);
    

    contentBlockName.innerHTML = userBlockComponent.innerText;
    contentBlockName.classList.add("content-block-title"); 
  }

  addOrRemoveSections(block, chosenBlockIndex, e: MouseEvent) {
    var checkbox = <HTMLInputElement>document.getElementById("checkbox" + block.id);
    var sectionsComponent = (<HTMLElement>document.getElementById("AddSectionsComponent"));
    var addRemoveLabel = (<HTMLElement>document.getElementById("AddOrRemove" + block.id));

    if (checkbox.checked) {
      sectionsComponent.classList.remove("hidden");
      addRemoveLabel.innerText = "Click to Remove";
      this.getBlockSections(block, e, chosenBlockIndex);
      this.blocks[chosenBlockIndex - 1].selected = true;

    } else {
      addRemoveLabel.innerText = "Click to Add";
      var currentBlockIndex = this.chooseBlocksService.getCurrentContentBlockIndex();
      this.blocks[chosenBlockIndex - 1].selected = false;
    }
  }

  openModal(modal, name, index, block, e: MouseEvent) {
    e.stopPropagation();
    modal.openModalDialog(name, block, index);
    this.chooseBlocksService.setRenameContentBlockIndex(index);
  }
  private className (Id){
    return Id
      .replace(/([A-Z][a-z])/g,' $1')
      .replace(/(\d)/g,' $1').trim()
      .replace(' ', '-').toLowerCase();
  }
}
