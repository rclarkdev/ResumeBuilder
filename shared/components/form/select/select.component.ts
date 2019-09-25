import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { DataService } from '../../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChooseBlocksService } from '../../../../build-resume/services/choose-blocks.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
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
export class SelectComponent implements OnInit {

  @Input() id: string;
  @Input() listItems: [{}];
  @Input() index: string;
  @Input() required: boolean;
  @Input() value: any;
  
  private otherStateProvinceVisible: boolean;
  private otherAwardVisible: boolean;
  private selectionName: string;
  private selectionValue: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private chooseBlocksService: ChooseBlocksService,
    private spinnerService: Ng4LoadingSpinnerService ) { }

  selectOption(value) {

    if(value.target.id === "Awarded") {
      if(value.target.value === "OtherAward") {
        this.otherAwardVisible = true;
      } else {
        this.otherAwardVisible = false;
        (<HTMLInputElement>document.getElementById('OtherAwardHidden')).value = value.target.options[value.target.selectedIndex].text;
        var otherAwardField = (<HTMLInputElement>document.getElementById("OtherAwardField"));
        if(otherAwardField){
          otherAwardField.value = "";
          otherAwardField.classList.add("hidden")
        }
      }
    }

    if(value.target.id === "StateProvince") {
      if(value.target.value === "OtherStateProvince") {
        this.otherStateProvinceVisible = true;
      } else {
        this.otherStateProvinceVisible = false;
        var otherStateProvinceField = (<HTMLInputElement>document.getElementById("OtherStateProvinceField"));
        if(otherStateProvinceField){
          otherStateProvinceField.value = "";
          otherStateProvinceField.classList.add("hidden")
        }
      }
    }

    if(value.target.id === "ContactInfo") {
      if(value.target.value === "NewContactInfo") {
        this.dataService.setCreateCoverContact(true);
        this.dataService.setNavUrl(decodeURI(window.location.pathname));
        this.dataService.setNavIcon("fa fa-arrow-left");
        this.dataService.setNavButtonText("Back to Cover Letter");
        this.router.navigate(['/app/4/resumebuilder/content-block-groups/Contact Info'], { relativeTo: this.activeRoute });
      }
    }
  }

  ngOnInit() {
    if(this.id === "ContactInfo") {
      this.spinnerService.show();
      this.dataService.setCreateCoverContact(false);
      this.chooseBlocksService.getUserContacts().subscribe((data) => {   
        var answers = data.answers;
        var contactList = document.getElementById('ContactInfo');
        for(var i = 0; i < answers.length; i++) {
          if(answers[i].name == "FirstName") {
            var option = document.createElement("option");
            if(answers[i].section){
              option.value = answers[i].section.sectionId;
              option.text = answers[i].section.name;
            }
            if(contactList) {
              contactList.appendChild(option);
            }
          }
        }
        (<HTMLSelectElement>contactList).value = this.value;
        this.spinnerService.hide();
      });       
    }
  }
}
  