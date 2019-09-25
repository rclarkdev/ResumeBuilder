import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SavedResumesService {

  private result: any;

  constructor(
    private http: HttpClient
  ) { }

  private selectedResumeSource = new BehaviorSubject<any>({});
  selectedResumeObservable = this.selectedResumeSource.asObservable();

  private resumeCssFileNameSource = new BehaviorSubject<any>("");
  resumeCssFileNameObservable = this.resumeCssFileNameSource.asObservable();

  getSavedResumes() {
    var result = this.http.get<any>(environment.resumeAPIUrl + "SavedResume/GetResumeUserFormsByAccountId" + environment.DevRouteValues);
    return result;
  }

  getSavedResume(userFormId) {
    var result = this.http.get<any>(environment.resumeAPIUrl + "SavedResume/GetUserFormById/" + userFormId + environment.DevRouteValues);
    return result;
  }

  getResumeCSS (){
    return this.http.get('../../../../../assets/stylesheets/Resume/resume.css', { responseType: 'text'});
  }

  getCoverCSS (){
    return this.http.get('../../../../../assets/stylesheets/CoverLetter/cover.css', { responseType: 'text'});
  }

  setResumeCssFileName(cssFileName) {
    this.resumeCssFileNameSource.next(cssFileName);
  }

  setResume(resume) {
    this.selectedResumeSource.next(resume);
  }

  getComponentContentBlock(contentBlocks, contentBlockName) {
    if (contentBlocks != null) {
      for (var i = 0; i < contentBlocks.length; i++) {
        var contentBlock = contentBlocks[i];
        if (contentBlock.name === contentBlockName) {
          return contentBlock;
        }
      }
    }
    return null;
  }

  getComponentAnswers(sections) {
    var sectionAnswers = [];
    if (sections != null) {
      for (var i = 0; i < sections.length; i++) {
        var vals = new Array();
        for (var j = 0; j < sections[i].section.answers.length; j++) {
          var answer = sections[i].section.answers[j];
          if (answer.componentName != null) {
            vals[answer.componentName] = answer.value;
          }
        }
        sectionAnswers.push(vals);
      }
    }
    return sectionAnswers;
  }

  deleteResume(resume) {
    if (resume.id && confirm("Are you sure you want to delete \"" + resume.name + "\"?")) {
      this.result = this.http.delete<any>(environment.resumeAPIUrl + "Resume/DeleteUserForm/" + resume.id  + environment.DevRouteValues);
    }
    return this.result;
  }
}
