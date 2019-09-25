import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SavedBlockService {

  result: Observable<any>

  private contentBlockSectionsSource = new BehaviorSubject<any>([{}]);
  contentBlockSectionsObservable = this.contentBlockSectionsSource.asObservable();

  constructor(private http: HttpClient) { }

  getSavedContentBlock(contentBlockSectionId) {
    return this.http.get<any>(environment.resumeAPIUrl + "FormBuilder/GetAnswersBySection/" + contentBlockSectionId + environment.DevRouteValues);
  }

  deleteSavedContentBlock(contentBlockSectionId) {
    return this.http.delete<any>(environment.resumeAPIUrl + "FormBuilder/DeleteSectionAndAnswers/" + contentBlockSectionId + environment.DevRouteValues);
  }

  setContentBlockSections(contentBlockSections) {
    this.contentBlockSectionsSource.next(contentBlockSections);
  }
} 
