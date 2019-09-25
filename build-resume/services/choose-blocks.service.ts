import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../../../environments/environment'
import { ContentBlocks } from '../../shared/constants/constants';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class ChooseBlocksService {

  private contentBlock;
  private userContentBlocks: any;
  private addedContentBlockSections: [{}];
  private renameContentBlockIndex: any;
  private currentContentBlockIndex: any;

  private contentBlockSource = new BehaviorSubject<any>([{}]);
  contentBlockObservable = this.contentBlockSource.asObservable();

  private contactInfoSelectedSource = new BehaviorSubject<any>(false);
  contactInfoSelectedObservable = this.contactInfoSelectedSource.asObservable();

  private userContentBlocksSource = new BehaviorSubject<any>([{}]);
  userContentBlocksObservable = this.userContentBlocksSource.asObservable();

  private chosenContentBlockNameSource = new BehaviorSubject<any>("");
  chosenContentBlockNameObservable = this.chosenContentBlockNameSource.asObservable();

  private renameContentBlockIndexSource = new BehaviorSubject<any>(0);
  renameContentBlockIndexObservalbe = this.renameContentBlockIndexSource.asObservable();

  private addedContentBlockSectionsSource = new BehaviorSubject<any>([{}]);
  addedContentBlockSectionsObservable = this.addedContentBlockSectionsSource.asObservable();

  private renameContentBlockSource = new BehaviorSubject<any>({});
  renameContentBlockObservable = this.renameContentBlockSource.asObservable();

  constructor(private http: HttpClient) { }

  getContentBlocksForUser() {
    var contentBlocks = this.http.get<any>(environment.resumeAPIUrl + "Resume/GetContentBlocksForForm" + environment.DevRouteValues);
    return contentBlocks;
  }

  getUserContacts() {
    var groups = this.http.get<any>(environment.resumeAPIUrl + 'FormBuilder/GetAnswersByName/' + ContentBlocks.ContanctInfo + environment.DevRouteValues);
    return groups;
  }

  getRenameContentBlockIndex() {
    return this.renameContentBlockIndex;
  }

  setRenameContentBlock(block) {
    this.renameContentBlockSource.next(block);
  }

  setRenameContentBlockIndex(index) {
    this.renameContentBlockIndex = index;
    this.renameContentBlockIndexSource.next(index);
  }

  setChosenContentBlockName(chosenContentBlockName) {
    this.chosenContentBlockNameSource.next(chosenContentBlockName);
  }

  setContactInfoSelected(selected) {
    this.contactInfoSelectedSource.next(selected);
  }

  getCurrentContentBlockIndex() {
    return this.currentContentBlockIndex;
  }

  addOrRemoveContentBlockSections(block, index, add: boolean = false) {
    if (add == true) {
      this.addedContentBlockSections.push(block);
    } else {
      this.addedContentBlockSections.splice(index, 1);
    }
  }

  getContentBlockSections(block: any) {
    this.contentBlock = block;
    this.contentBlockSource.next(this.contentBlock);
  }

  updateUserContentBlock(userContentBlocks, contentBlock, section, checked, answers) {
    for (var i = 0; i < answers.length; i++) {
      if(answers[i].componentName && answers[i].value){
        answers[i].label = answers[i].componentName.replace(/([A-Z])/g, ' $1');
      }
    }
    for (var i = 0; i < contentBlock.sections.length; i++) {
      if(contentBlock.name === ContentBlocks.ContanctInfo){
        contentBlock.sections[i].selected = false;
      }
      if (contentBlock.sections[i].id == section.id) {
        contentBlock.sections[i].selected = checked;
        contentBlock.sections[i].answers = answers.filter(function (result) {
          return result.componentName && result.value;
        });
      }
    }
    this.setUserContentBlocks(userContentBlocks);
  }

  setCurrentContentBlockIndex(index: number) {
    this.currentContentBlockIndex = index;
  }

  setUserContentBlocks(userBlocks) {
    this.userContentBlocksSource.next(userBlocks);
  }
  setContentBlocks(userContentBlocks) {
    this.contentBlockSource.next(userContentBlocks);
  }

  saveResume(userContentBlocks, userForm) {
    var formComponents = {
      ContentBlocks: userContentBlocks,
      UserForm: userForm
    };

    return this.http.post<any>(environment.resumeAPIUrl + 'Resume/SaveUserForm' + environment.DevRouteValues, formComponents);
  }
}
