import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SavedCoverLettersService {

  private result: any;

  private selectedCoverLetterSource = new BehaviorSubject<any>({});
  selectedCoverLetterObservable = this.selectedCoverLetterSource.asObservable();

  private headingAnswersSource = new BehaviorSubject<any>([{}]);
  headingAnswersObservable = this.headingAnswersSource.asObservable();

  constructor(private http: HttpClient) { }

  setCoverLetter(coverLetter) {
    this.selectedCoverLetterSource.next(coverLetter);
  }

  setHeadingAnswers(headingAnswers){
    this.headingAnswersSource.next(headingAnswers);
  }

  getSavedCoverLetters() {
    var result = this.http.get<any>(environment.resumeAPIUrl + "SavedResume/GetCoverLetterUserFormsByAccount" + environment.DevRouteValues);
    return result;
  }

  getSavedCoverLetter(userFormId) {
    var result = this.http.get<any>(environment.resumeAPIUrl + "SavedResume/GetUserFormById/" + userFormId + environment.DevRouteValues);
    return result;
  }

  deleteCoverLetter(coverLetter) {
    if (coverLetter.id && confirm("Are you sure you want to delete \"" + coverLetter.name + "\"?")) {
      this.result = this.http.delete<any>(environment.resumeAPIUrl + "Resume/DeleteUserForm/" + coverLetter.id + environment.DevRouteValues);
    }
    return this.result;
  }
}
