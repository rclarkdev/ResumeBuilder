import { Component, OnInit } from '@angular/core';
import { ChooseBlocksService } from '../services/choose-blocks.service';
import { AddSectionsService } from '../services/add-sections.service';
import { SavedBlockService } from '../../content-wizard/services/saved-block.service';
import { ContentBlocks } from '../../shared/constants/constants'

@Component({
  selector: 'app-add-sections',
  templateUrl: './add-sections.component.html',
  styleUrls: ['./add-sections.component.css']
})
export class AddSectionsComponent implements OnInit {

  contentBlock: any;
  chosenContentBlockName: any;
  userContentBlocks: any;
  private displaySections: boolean; 

  constructor(
    private chooseBlocksService: ChooseBlocksService,
    private addSectionService: AddSectionsService,
    private savedBlockService: SavedBlockService,
  ) { }

  ngOnInit() {
    this.chooseBlocksService.contentBlockObservable.subscribe(contentBlock => this.contentBlock = contentBlock);
    this.chooseBlocksService.chosenContentBlockNameObservable.subscribe(chosenContenBlockName => this.chosenContentBlockName = chosenContenBlockName);
    this.chooseBlocksService.userContentBlocksObservable.subscribe(userContentBlocks => this.userContentBlocks = userContentBlocks);
  }

  selectSection(contentBlock, section, event) {
    if(contentBlock.name === ContentBlocks.ContanctInfo) {
      this.chooseBlocksService.setContactInfoSelected(true);
      document.getElementById('RequiredContactInfo').classList.add('rc-validation');
      var checkboxes = document.getElementsByClassName("checkbox");
      for(var i = 0; i < checkboxes.length; i++) {
        (<HTMLInputElement>checkboxes[i]).checked = false;
        event.target.checked = true;
      }
    }
    let checked = event.target.checked;
    this.savedBlockService.getSavedContentBlock(section.id).subscribe((result) => {
      let answers = result.answers;
      this.chooseBlocksService.updateUserContentBlock(this.userContentBlocks, contentBlock, section, checked, answers);
    });
  }
}
