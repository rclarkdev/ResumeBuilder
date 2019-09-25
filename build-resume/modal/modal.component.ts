import { Component, OnInit, Input } from '@angular/core';
import { ChooseBlocksService } from '../services/choose-blocks.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  namingForm: any;
  contentBlockName: any;
  @Input() renameBlock: any;
  renameIndex: any;
  display = 'none';

  private userContentBlocks: any;

  constructor(
    private chooseBlocksService: ChooseBlocksService
  ) { }
  
  ngOnInit() {
    this.chooseBlocksService.userContentBlocksObservable.subscribe(userContentBlocks => this.userContentBlocks = userContentBlocks);
  }

  setCustomContentBlockName() {
    
    let customName = (<HTMLInputElement>document.getElementById("SectionName")).value;
    let renameIndex = this.chooseBlocksService.getRenameContentBlockIndex();
    let currentIndex = this.chooseBlocksService.getCurrentContentBlockIndex();
    let contentBlock = <HTMLInputElement>document.getElementById("ContentBlock" + renameIndex);
    let blockName = <HTMLElement>document.getElementById("BlockName" + renameIndex);
    blockName.innerText = customName;

    if (this.userContentBlocks != null) {
      var block = this.renameBlock;// this.userContentBlocks[renameIndex - 1];
      // block.name = customName;
      block.customName = customName;
    }
    if (currentIndex == renameIndex) {
      (<HTMLElement>document.getElementById("ContentBlockName")).innerText = customName;
    }
  }
  
  openModalDialog(name, block, index) {
    this.display = 'block';
    this.renameBlock = block;
    this.contentBlockName = (<HTMLInputElement>document.getElementById("BlockName" + index)).innerText;
    this.chooseBlocksService.setRenameContentBlockIndex(index);
  }

  closeModalDialog() {
    this.display = 'none';
  }

}
