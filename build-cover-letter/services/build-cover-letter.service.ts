import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildCoverLetterService {

  private contentBlockSource = new BehaviorSubject<any>([{}]);
  contentBlockObservable = this.contentBlockSource.asObservable();

  private userContentBlocksSource = new BehaviorSubject<any>([{}]);
  userContentBlocksObservable = this.userContentBlocksSource.asObservable();

  private chosenContentBlockNameSource = new BehaviorSubject<any>("");
  chosenContentBlockNameObservable = this.chosenContentBlockNameSource.asObservable();

  private coverLetterTypeSource = new BehaviorSubject<any>("");
  typeObservable = this.coverLetterTypeSource.asObservable();

  private coverLetterNameSource = new BehaviorSubject<any>("");
  coverLetterNameObservable = this.coverLetterNameSource.asObservable();

  private coverLetterStyleSource = new BehaviorSubject<any>("");
  styleObservable = this.coverLetterStyleSource.asObservable();

  private userFormSource = new BehaviorSubject<any>("");
  userFormObservable = this.userFormSource.asObservable();

  private contentBlock: any;

  constructor(private http: HttpClient) { }

  setCoverLetterType(coverLetterType) {
    this.coverLetterTypeSource.next(coverLetterType);
  }

  setCoverLetterName(coverLetterName) {
    this.coverLetterNameSource.next(coverLetterName);
  }

  setCoverLetterStyle(coverLetterStyle) {
    this.coverLetterStyleSource.next(coverLetterStyle)
  }

  createUserForm(name, type, style) {

    var userFormModel = {
      FormType: "CoverLetter",
      Name: name,
      Template: type,
      Style: style
    };

    var url = this.http.post<any>(environment.resumeAPIUrl + "Resume/AddUserForm" + environment.DevRouteValues, userFormModel);
    return url;
  }

  setUserForm(userFrom) {
    this.userFormSource.next(userFrom)
  }


  getCoverLettersForUser() {
    var result = this.http.get<any>(environment.resumeAPIUrl + "Resume/GetContentBlocksForForm" + environment.DevRouteValues);
    return result;
  }

  setUserContentBlocks(userBlocks) {
    this.userContentBlocksSource.next(userBlocks);
  }
  setContentBlock(userContentBlock) {
    this.contentBlockSource.next(userContentBlock);
  }

  saveCoverLetter(coverLetter, userForm) {
    var formComponents = {
      ContentBlocks: [coverLetter],
      UserForm: userForm
    };

    return this.http.post<any>(environment.resumeAPIUrl + 'Resume/SaveUserForm' + environment.DevRouteValues, formComponents);
  }
}

