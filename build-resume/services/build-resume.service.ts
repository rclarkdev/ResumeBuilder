import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildResumeService {

  private resumeTypeSource = new BehaviorSubject<any>("");
  typeObservable = this.resumeTypeSource.asObservable();

  private resumeNameSource = new BehaviorSubject<any>("");
  resumeNameObservable = this.resumeNameSource.asObservable();

  private resumeStyleSource = new BehaviorSubject<any>("");
  styleObservable = this.resumeStyleSource.asObservable();

  private userFormSource = new BehaviorSubject<any>("");
  userFormObservable = this.userFormSource.asObservable();

  constructor(private http: HttpClient) { }

  setResumeType(resumeType) {
    this.resumeTypeSource.next(resumeType);
  }

  setResumeName(resumeName) {
    this.resumeNameSource.next(resumeName);
  }

  setResumeStyle(resumeStyle) {
    this.resumeStyleSource.next(resumeStyle)
  }

  createUserForm(name, type, style) {

    var userFormModel = {
      FormType: "Resume",
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
}

