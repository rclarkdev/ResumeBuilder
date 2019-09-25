import { Component, OnInit } from '@angular/core';
import { SavedBlockService } from '../services/saved-block.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saved-blocks',
  templateUrl: './saved-blocks.component.html',
  styleUrls: ['./saved-blocks.component.css']
})
export class SavedBlocksComponent implements OnInit {

  private contentBlockSections: any;

  constructor(private route: ActivatedRoute,
    private savedBlockService: SavedBlockService = null,
    private router: Router) { }

  ngOnInit() {
    this.savedBlockService.contentBlockSectionsObservable
      .subscribe(contentBlockSections => this.contentBlockSections = contentBlockSections);
  }

  deleteSavedContentBlock(contentBlockSectionId) {
    if (confirm("Are you sure you want to delete?")) {
      this.savedBlockService.deleteSavedContentBlock(contentBlockSectionId).subscribe((result) => {
        if (result.success == true) {
          this.contentBlockSections = this.contentBlockSections.filter(function (contentBlockSection) {
            return contentBlockSection.id != contentBlockSectionId;
          });
          this.savedBlockService.setContentBlockSections(this.contentBlockSections);
        }
      });
    }
  }

  getSavedContentBlock(contentBlockSectionId, contentBlockName, contentBlockGroupId) {
    if (contentBlockName && contentBlockGroupId) {
      this.router.navigate(['/app/4/resumebuilder/content-wizard', contentBlockName, contentBlockGroupId, contentBlockSectionId], { relativeTo: this.route });
    }
    else
    {
      this.savedBlockService.getSavedContentBlock(contentBlockSectionId).subscribe((result) => {

        var answers = result.answers;
        for (var i = 0; i < answers.length; i++) {

          if (answers[i].type === "radio") {
            var radios = document.getElementsByName(answers[i].componentName);
            for (var r = 0, length = radios.length; r < length; r++) {
              var radio = <HTMLInputElement>radios[r];
              radio.checked = false;
            }
          }

          var field = <HTMLInputElement>document.getElementById(answers[i].name);
          if (field != null) {
            if (field.type === "radio") {
              field.checked = true;
            }
            field.value = answers[i].value;
          }
        }
        
      });
    }
  }
}
