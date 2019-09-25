import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentBlockGroupsService {

  private contentBlockGroups: any;

  private contentBlockGroup: any;
  private contentBlockGroupSource = new BehaviorSubject<any>("");
  contentBlockGroupObservable = this.contentBlockGroupSource.asObservable();

  private contentBlockGroupsSource = new BehaviorSubject<any>("");
  contentBlockGroupsObservable = this.contentBlockGroupsSource.asObservable();

  constructor(private http: HttpClient) { }

  getContentBlockGroups(contentBlockName) {
    var groups = this.http.get<any>(environment.resumeAPIUrl + 'FormBuilder/GetContentBlockGroups/' + contentBlockName + environment.DevRouteValues);
    return groups;
  }

  getContentBlockGroupById(contentBlockGroupId) {
    var group = this.http.get<any>(environment.resumeAPIUrl + 'FormBuilder/GetContentBlockGroup/' + contentBlockGroupId + environment.DevRouteValues);
    return group;
  }

  setContentBlockGroup(contentBlockGroup) {
    this.contentBlockGroupSource.next(contentBlockGroup);
  }

  setContentBlockGroups(contentBlockGroups) {
    this.contentBlockGroupsSource.next(contentBlockGroups);
  }

}
