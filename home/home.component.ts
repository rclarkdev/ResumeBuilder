import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { HomeService } from './Services/home.service';
import { NgbdModalLoaderContent } from '../../../shared/modal/shared-modal-component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeMenu: any[];
  navigationTypes: any;
  private contentBlockList;
  private navigationTypesSource = new BehaviorSubject<any>({});
  navigationTypesObservable = this.navigationTypesSource.asObservable();

  constructor(
    private loaderContent: NgbdModalLoaderContent,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private dataService: DataService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.loaderContent.hideLoading();
    this.spinnerService.show();
    this.dataService.navTypesObservable.subscribe(navigationTypes => this.navigationTypes = navigationTypes);
    this.dataService.homeMenuObservable.subscribe(homeMenu => this.homeMenu = homeMenu);
    this.dataService.contentBlockListObservable.subscribe(contentBlockList => this.contentBlockList = contentBlockList);
    this.homeService.getHomeMenu().subscribe((homeMenu) => {
      var langset = sessionStorage.getItem("langset");
      var language = langset ? langset : 'en';
      this.spinnerService.hide();
      this.homeMenu = homeMenu.filter(function (navItem){
          return navItem.language === language;
      });
    });
  }

  selectMenuItem(menuItem) {
    this.dataService.setCreateCoverContact(false);
    this.dataService.setNavUrl(menuItem.name === "Resume Info" ? "/app/4/resumebuilder/content-blocks" : "/app/4/resumebuilder/home");
    this.router.navigate([menuItem.route], { relativeTo: this.activeRoute });
  }
}