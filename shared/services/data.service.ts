import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private navTypes: any;
  private hiddenBulletEntries: any;

  private selectedNavTypeSource = new BehaviorSubject<any>(Number);
  selectedNavTypeObservable = this.selectedNavTypeSource.asObservable();

  private navTypesSource = new BehaviorSubject<any>({});
  navTypesObservable = this.navTypesSource.asObservable();

  private contentBlockNameSource = new BehaviorSubject<any>({});
  contentBlockNameObservable = this.contentBlockNameSource.asObservable();

  private contentBlockListSource = new BehaviorSubject<any>([{}]);
  contentBlockListObservable = this.contentBlockListSource.asObservable();

  private contentBlockListMobileSource = new BehaviorSubject<any>([{}]);
  contentBlockListMobileObservable = this.contentBlockListMobileSource.asObservable();

  private contentBlockIndexSource = new BehaviorSubject<any>([{}]);
  contentBlockIndexObservable = this.contentBlockIndexSource.asObservable();

  private navMenuSource = new BehaviorSubject<any>([{}]);
  navMenuObservable = this.navMenuSource.asObservable();

  private navMenuMobileSource = new BehaviorSubject<any>([{}]);
  navMenuMobileObservable = this.navMenuMobileSource.asObservable();

  private homeMenuSource = new BehaviorSubject<any>([{}]);
  homeMenuObservable = this.homeMenuSource.asObservable();

  private defaultHeaderText = "Resume Builder"; // TODO: Get this from resource file
  private currentHeaderText = ""; // TODO: get from api or resource

  private defaultHeaderMessageSource = new BehaviorSubject<any>(this.defaultHeaderText);
  defaultHeaderMessageObservable = this.defaultHeaderMessageSource.asObservable();

  private currentHeaderMessageSource = new BehaviorSubject<any>(this.currentHeaderText);
  currentHeaderMessageObservable = this.currentHeaderMessageSource.asObservable();

  private selectedContentBlockSource = new BehaviorSubject<any>("");
  contentBlockObservable = this.selectedContentBlockSource.asObservable();

  private navUrlSource = new BehaviorSubject("");
  navUrlObservable = this.navUrlSource.asObservable();

  private navTextSource = new BehaviorSubject("");
  navTextObservable = this.navTextSource.asObservable();

  private navIconSource = new BehaviorSubject("");
  navIconObservable = this.navIconSource.asObservable();

  private createCoverContactSource = new BehaviorSubject("");
  createCoverContactObservable = this.createCoverContactSource.asObservable();

  private hiddenBulletEntriesSource = new BehaviorSubject([{}]);
  hiddenBulletEntriesObservable = this.hiddenBulletEntriesSource.asObservable();

  constructor(
    private http: HttpClient,
    private dataService: DataService) { }

  setNavUrl(url) {
    this.navUrlSource.next(url);
  }

  setNavButtonText(text) {
    this.navTextSource.next(text);
  }

  setNavIcon(icon) {
    this.navIconSource.next(icon);
  }

  setContentBlockName(contentBlockName) {
    this.contentBlockNameSource.next(contentBlockName);
  }

  setContentBlockIndex(index) {
    this.contentBlockIndexSource.next(index);
  }

  setHeaderMessage(textField) {
    this.currentHeaderMessageSource.next(textField);
  }

  setSelectedNavType(selectedNavType) {
    this.selectedNavTypeSource.next(selectedNavType);
  }

  setCreateCoverContact(createContact) {
    this.createCoverContactSource.next(createContact);
  }

  setHiddenBulletEntries(hiddenBulletEntries) {
    this.hiddenBulletEntriesSource.next(hiddenBulletEntries);
  }

  getNavMenu() {
      this.navTypesObservable.subscribe(navTypes => this.navTypes = navTypes);
      this.getNavTypes();
      var navType = "ResumeInfo";
      this.http.get<any>(environment.resumeAPIUrl + "Navigation/GetNavMenu/" + navType + environment.DevRouteValues).subscribe((navMenu) => {
        
      var langset = sessionStorage.getItem("langset");
      var language = langset ? langset : 'en';
      navMenu = navMenu.filter(function (navItem){
        return navItem.language === language;
      });

      this.navMenuSource.next(navMenu);

      var contentBlocks = new Array();
      for (let navItem of navMenu) {
        if (navItem.navType === this.navTypes.ResumeInfo) {
          contentBlocks.push(navItem);
        }
      }
      this.contentBlockListSource.next(contentBlocks);
    });
  }

  getNavMenuMobile(selectedNavType, navTypes) {

    var navType = "Home";
    if (selectedNavType != null) {
      navType = selectedNavType;
    

    this.http.get<any>(environment.resumeAPIUrl + "Navigation/GetMobileNavMenu/" + navType + environment.DevRouteValues).subscribe((navMenu) => {

      this.navMenuMobileSource.next(navMenu);

      var contentBlocks = new Array();
      for (let navItem of navMenu) {
        contentBlocks.push(navItem);
      }
      this.contentBlockListMobileSource.next(contentBlocks);
    });
  }
}

  getNavTypes() {
    this.http.get<any>(environment.resumeAPIUrl + "Navigation/GetNavTypes" + environment.DevRouteValues).subscribe((navTypes) => {
      this.navTypesSource.next(navTypes);
    });
  }
}
