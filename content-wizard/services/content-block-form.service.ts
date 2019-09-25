import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable({
  providedIn: 'root'
})
export class ContentBlockFormService {

  constructor(private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService) { }

  getContentBlockFormByGroup(contentBlockName: string, contentBlockGroupId: number, sectionId: number) {
    var form = this.http.get<any>(environment.resumeAPIUrl + "FormBuilder/GetForm/" + contentBlockName + "/" + contentBlockGroupId + "/" + sectionId + environment.DevRouteValues);
    return form;
  }

  saveContentBlock(contentBlockRows: ContentBlockRow[]) {
    var formComponents = [];
    var formInvalid = false;

    var sectionTitle = (<HTMLInputElement>document.getElementById("SectionTitle")).value;
    var element = document.getElementById("RequiredSectionTitle");

    if (!sectionTitle) {
    
      if(element)
        element.classList.remove("rc-validation");

      formInvalid = true;
    } else {

      if(element)
        element.classList.add("rc-validation");

      formComponents.push({ Name: "SectionTitle", Value: sectionTitle });
      var sectionId = (<HTMLInputElement>document.getElementById("SectionId")).value;
      formComponents.push({ Name: "SectionId", Value: sectionId });
      var contentBlockId = (<HTMLInputElement>document.getElementById("ContentBlockId")).value;
      formComponents.push({ Name: "ContentBlockId", Value: contentBlockId });
    }
    
    var otherAwardValue;
    var otherStateProvinceValue;
    for (let i = 0; i < contentBlockRows.length; i++) {
      for (let j = 0; j < contentBlockRows[i].inputDirectiveGroups.length; j++) {
        for (let k = 0; k < contentBlockRows[i].inputDirectiveGroups[j].inputDirectives.length; k++) {

          var inputDirective = contentBlockRows[i].inputDirectiveGroups[j].inputDirectives[k];
          if(!inputDirective.formComponent.disabled) {

            var componentName = inputDirective.formComponent.componentName;
            var componentValue = "";

            // This is for EntryType and Hidden Fields, but they're disabled 

            var isEntryType = componentName.includes("EntryType");
            // if (isEntryType) {
            //   var count = 0;
            //   var id = componentName.replace("Type", "");
            //   var delimitedEntries = "";           
            //   var entry = (<HTMLInputElement>document.getElementById(id));
                
            //   while(entry) {
            //     count++;
            //     delimitedEntries += entry.value + "##";
            //     entry = (<HTMLInputElement>document.getElementById(id+count));
            //   }
            //   var hiddenField = (<HTMLInputElement>document.getElementById(id+"Hidden"));
            //   hiddenField.value = delimitedEntries.slice(0, -2);
            // }

            if (inputDirective.directiveType === "radio") {

              var radios = document.getElementsByName(componentName);
              for (var r = 0, length = radios.length; r < length; r++) {
                var radio = <HTMLInputElement>radios[r];
                if (radio.checked) {
                  componentValue = radio.value;
                  break;
                }
              }
            } else if (inputDirective.directiveType === "select") {
              componentValue = 
                (<HTMLOptionElement>document.getElementById(componentName)).text || 
                (<HTMLInputElement>document.getElementById(componentName)).value;
            } else if (inputDirective.directiveType === "textarea"){
              var component = (<HTMLElement>document.getElementById(componentName));
              if(component){
                var container = document.getElementById(componentName+"Editor");
                if(container){
                  var innerElement = container.children[0];
                  if(innerElement)
                    var componentValue = innerElement.innerHTML;  
                }
              }
               
            } else {
              componentValue = (<HTMLInputElement>document.getElementById(componentName)).value;
    
              if(componentName === "Awarded")
                (<HTMLInputElement>document.getElementById("OtherAwardHidden")).value = 
                (<HTMLInputElement>document.getElementById(componentName)).value;
            }
            element = document.getElementById("Required" + componentName);

            var innerText = componentValue.replace(/(<([^>]+)>)/ig, "");
            if (inputDirective.formComponent.required && !innerText) {
              if(element) 
                element.classList.remove("rc-validation");
              formInvalid = true;
            } else {
              if(element) 
                element.classList.add("rc-validation");
              formComponents.push({ Name: componentName, Value: componentValue });
            }
            
            if(componentValue === "OtherAward") {
              var otherElement = (<HTMLInputElement>document.getElementById("OtherAwardField"));
              if(otherElement && !otherElement.value) {
                if(element)
                  element.classList.remove("rc-validation");
                formInvalid = true;
              } else {
                if(element)
                  element.classList.add("rc-validation");
                formInvalid = false;
                otherAwardValue = otherElement.value;
              }
            }

            if(componentValue === "OtherStateProvince") {
              otherElement = (<HTMLInputElement>document.getElementById("OtherStateProvinceField"));
              if(otherElement && !otherElement.value) {
                if(element)
                  element.classList.remove("rc-validation");
                formInvalid = true;
              } else {
                if(element)
                  element.classList.add("rc-validation");
                formInvalid = false;
                otherStateProvinceValue = otherElement.value;
              }
            }
          }
        }
      }
    }

    var index = this.findWithAttr(formComponents, "Name", "OtherAwardHidden");
    if(index > -1){
      formComponents[index]["Value"] = otherAwardValue ? 
      otherAwardValue : formComponents[index]["Value"];
    } else {
      if(otherAwardValue)
        formComponents.push({Name: "OtherAwardHidden", Value: otherAwardValue });
    }

    index = this.findWithAttr(formComponents, "Name", "StateProvinceHidden");
    if(index > -1) {
      formComponents[index]["Value"] = otherStateProvinceValue ? 
      otherStateProvinceValue : formComponents[index]["Value"];
    } else {
      if(otherStateProvinceValue)
        formComponents.push({Name: "StateProvinceHidden", Value: otherStateProvinceValue });
    }

    if (!formInvalid) {
      this.spinnerService.show();
        return this.http.post<any>(environment.resumeAPIUrl + 'FormBuilder/SubmitAnswers' + environment.DevRouteValues, formComponents);
    }
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }
}
  

interface ContentBlockRow {
  inputDirectiveGroups: InputDirectiveGroup[];
}
interface InputDirectiveGroup {
  inputDirectives: InputDirective[];
}
interface InputDirective {
  directiveType: string;
  formComponent: FormComponent;
}
interface FormComponent {
  componentName: string;
  componentValue: string;
  required: boolean;
  disabled: boolean;
}
