import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResponseType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SavePrintExportService {

  constructor(
    private http: HttpClient
  ) { }

  getCss(url) {
    return this.http.get<any>(url);
  }
  
  downloadPdf (userFormId, resumeHtmlCss) {
    var stateAbbr = environment.DevRouteValues.split('/')[1];
    var accountId = environment.DevRouteValues.split('/')[2];
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");
    return this.http.post<any>(environment.resumeAPIUrl + "Export/Pdf/" + userFormId + environment.DevRouteValues, { resumeHtmlCss }, { headers: headers });
  }

  downloadWord (userFormId, resumeHtmlCss) {
    var stateAbbr = environment.DevRouteValues.split('/')[1];
    var accountId = environment.DevRouteValues.split('/')[2];
    let headers = new HttpHeaders();
    headers.append("Accept", "application/pdf");
    return this.http.post<any>(environment.resumeAPIUrl + "Export/Word/" + userFormId + environment.DevRouteValues, { resumeHtmlCss }, { headers: headers });
  }

  exportPdf(userFormId, resumeHtmlCss) {
    
    this.downloadPdf(userFormId, resumeHtmlCss).subscribe((result) => {
      if (result && result.pdfResult) {
        var binary = atob(result.pdfResult.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        var blob = new Blob( [view], { type: "application/pdf" });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
          window.navigator.msSaveOrOpenBlob(blob, result.fileName);
        } else { // for Non-IE
          var url = URL.createObjectURL(blob);
          window.open(url);

          var link = document.createElement('a');
          link.href = url;
          link.download = result.fileName;
          link.click();
        }
      }
    });
  }

  exportWord(userFormId, resumeHtmlCss) {
    
    this.downloadWord(userFormId, resumeHtmlCss).subscribe((result) => {
      if (result && result.pdfResult) {
        var binary = atob(result.pdfResult.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        var blob = new Blob( [view], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
          window.navigator.msSaveOrOpenBlob(blob, result.fileName);
        } else { // for Non-IE
          var url = URL.createObjectURL(blob);
          window.open(url);

          var link = document.createElement('a');
          link.href = url;
          link.download = result.fileName;
          link.click();
        }
      }
    });
  }
}
