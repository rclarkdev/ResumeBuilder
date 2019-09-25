import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { NavMenuComponent } from '../../shared/components/nav-menu/nav-menu.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-next-prev',
  templateUrl: './next-prev.component.html',
  styleUrls: ['./next-prev.component.css']
})
export class NextPrevComponent implements OnInit {

  private contentBlockList: any;
  private contentBlockListMobile: any;
  private currentIndex: any;
  private navTypes: any;
  private selectedNavType: any;
  private newIndex: any;

  prevBtn: any;
  nextBtn: any;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private navMenuComponent: NavMenuComponent) { }

  ngOnInit() {
    this.prevBtn = document.getElementsByClassName("btn-prev");
    this.nextBtn = document.getElementsByClassName("btn-next");

    this.dataService.navTypesObservable.subscribe(navTypes => this.navTypes = navTypes);
    this.dataService.selectedNavTypeObservable.subscribe(selectedNavType => this.selectedNavType = selectedNavType);
    this.dataService.contentBlockIndexObservable.subscribe(currentIndex => this.currentIndex = currentIndex);
    this.dataService.contentBlockListObservable.subscribe(contentBlockList => this.contentBlockList = contentBlockList);
    this.dataService.contentBlockListMobileObservable.subscribe(contentBlockListMobile => this.contentBlockListMobile = contentBlockListMobile);
    this.dataService.getNavMenu();
    this.dataService.getNavTypes();

    if (this.selectedNavType === this.navTypes.CoverLetter) {
      (<HTMLElement>document.getElementById("NextPrevComponent")).classList.add("hidden");
    } else {
      (<HTMLElement>document.getElementById("NextPrevComponent")).classList.remove("hidden");
    }

    if (this.currentIndex >= (this.contentBlockList.length - 1)) {
      this.nextBtn[0].classList.add("element-disabled");
    }

    if (this.currentIndex === 0) {
      this.prevBtn[0].classList.add("element-disabled");
    }
  }

  getNextOrPrev(offset, event) {
    this.newIndex = this.currentIndex + offset;
    if (this.newIndex >= 0 && this.newIndex < this.contentBlockList.length) {
      let navItem = this.contentBlockList[this.newIndex];
      this.navMenuComponent.selectNavItem('/app/4/resumebuilder/' + navItem.route + '/' + navItem.name, navItem.name, navItem.navType);
    }
  }
}
