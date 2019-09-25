import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddSectionsService {

  private section;

  private sectionSourceSource = new BehaviorSubject<any>([{}]);
  selectedSection = this.sectionSourceSource.asObservable();

  constructor() { }

  addSection(element, contentBlock) {

  }
  removeSection(element, contentBlock) {

  }
}
