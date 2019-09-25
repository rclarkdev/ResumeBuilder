import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private customContentBlockNameSource = new BehaviorSubject<any>("");
  customContentBlockNameObservable = this.customContentBlockNameSource.asObservable();

  constructor() { }

  setCustomContentBlockName(name: string) {
    this.customContentBlockNameSource.next(name);
  }
}
