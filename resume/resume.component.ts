import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SavedResumesService } from '../print-preview/Services/saved-resumes.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ContentBlocks } from '../shared/constants/constants';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css', '../stylesheets/common.css']
})
export class ResumeComponent implements OnInit {

  private resume: any;

  private type: any;
  private style: any;
  private heading: any;
  private contactInfo: any;
  private resumeId: any;
  private contentBlockOther: any;
  private contentBlockCertifications: any;
  private contentBlockExperience: any;
  private contentBlockQualifications: any;
  private contentBlockEducation: any;
  private contentBlockSkillsAndAbilities: any;
  private contentBlocks: any[] = new Array();
  private fullName: any;
  private address: any;
  private phoneNumber: any;
  private emailAddress: any;
  private website: any;
  private cssUrl: any;

  constructor(
    private router: Router,
    public sanitizer: DomSanitizer,
    private savedResumesService: SavedResumesService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  getSavedResume(id) {
    return new Promise((resolve, reject) => {
      this.savedResumesService.getSavedResume(id)
          .subscribe(result => {
            if (result) {
              this.savedResumesService.setResume(result);
            }         
            resolve(result);
          }, error => reject(error));
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.resumeId = params['id'];
      });

    this.cssUrl = '/assets/stylesheets/Resume/resume.css';
    
    if(this.resumeId) {

      this.spinnerService.show();
      var context = this;

      context.getSavedResume(context.resumeId).then(function (resume){

        context.resume = resume;
        if (context.resume.userForm) {
          if (context.resume.userForm.name == null) {
            context.router.navigate(['../../saved-resumes']);
          }
          else {
    
            context.type = context.resume.userForm.template;
            context.style = context.resume.userForm.style;
    
            if (context.type && context.style) {
              context.resumeId = context.type + context.style;
              context.className = context.className(context.resumeId);
            }
    
            if (context.resume.userForm.contentBlocks) {
              
              var otherIndex, skillsIndex, certsIndex, expIndex, eduIndex, qualIndex;
              
              context.resume.userForm.contentBlocks.forEach(contentBlock => {
    
                if (contentBlock.sections && contentBlock.contentBlockGroupName) {
                  switch (contentBlock.name) {
                    case ContentBlocks.ContanctInfo:
                    context.contactInfo = context.savedResumesService.getComponentAnswers(contentBlock.sections);
                      
                      if (context.contactInfo) {
                        context.contactInfo.forEach(element => {
    
                          context.fullName = (element.FirstName + " ")
                            .concat(element.LastName);
    
                            context.phoneNumber = element.PhoneNumber;
                            context.emailAddress = element.EmailAddress;
                            context.website = element.ProfessionalWebProfile;
    
                            context.address = (element.Address1 ? element.Address1 + " " : "")
                            .concat(element.Address2 ? element.Address2 + ", " : "")
                            .concat(element.City ? element.City + ", " : "")
                            .concat(element.StateProvince ? element.StateProvince + " " : "")
                            .concat(element.PostalCode ? element.PostalCode + " " : "");
                        });
                      }
                      
                      context.heading = {
                        ClassName: context.className,
                        FullName: context.fullName, 
                        PhoneNumber: context.phoneNumber, 
                        EmailAddress: context.emailAddress,
                        Website: context.website,
                        Address: context.address
                      };
                      
                      break;
                  
                      case ContentBlocks.Other: {
                        for(var i = 0; i < contentBlock.sections.length; i++) {
                          var contentBlockGroup = context.getAnswers(contentBlock.sections[i], contentBlock.name, contentBlock.contentBlockGroupName);
                          if(!context.contentBlockOther) {
                            context.contentBlockOther = { ContentBlockName: contentBlock.name, CustomName: contentBlock.customName, ContentBlockGroups: [contentBlockGroup], ClassName: context.className };           
                          } else {                                       
                            context.contentBlockOther.ContentBlockGroups.push(contentBlockGroup); 
                          }
                        }
                        if(isNaN(otherIndex)) {
                          context.contentBlocks.push(context.contentBlockOther);
                          otherIndex = context.contentBlocks.length - 1;
                        } else {
                          context.contentBlocks[otherIndex] = context.contentBlockOther;
                        }
                        break;
                      }
                    
                    case ContentBlocks.SkillsAndAbilities: {
                      for(var i = 0; i < contentBlock.sections.length; i++) {
                        var contentBlockGroup = context.getAnswers(contentBlock.sections[i], contentBlock.name, contentBlock.contentBlockGroupName);
                        if(!context.contentBlockSkillsAndAbilities) {
                          context.contentBlockSkillsAndAbilities = { ContentBlockName: contentBlock.name, CustomName: contentBlock.customName, ContentBlockGroups: [contentBlockGroup], ClassName: context.className };            
                        } else {                                       
                          context.contentBlockSkillsAndAbilities.ContentBlockGroups.push(contentBlockGroup);   
                        }
                      }
                      if(isNaN(skillsIndex)) {
                        context.contentBlocks.push(context.contentBlockSkillsAndAbilities);
                        skillsIndex = context.contentBlocks.length - 1;
                      } else {
                        context.contentBlocks[skillsIndex] = context.contentBlockSkillsAndAbilities;
                      }
                      break;
                    }
                    case ContentBlocks.Certifications: {
                      for(var i = 0; i < contentBlock.sections.length; i++) {
                        var contentBlockGroup = context.getAnswers(contentBlock.sections[i], contentBlock.name, contentBlock.contentBlockGroupName);
                        if(!context.contentBlockCertifications) {
                          context.contentBlockCertifications = { ContentBlockName: contentBlock.name, CustomName: contentBlock.customName, ContentBlockGroups: [contentBlockGroup], ClassName: context.className };            
                        } else {                                       
                          context.contentBlockCertifications.ContentBlockGroups.push(contentBlockGroup);   
                        }
                      }
                      if(isNaN(certsIndex)) {
                        context.contentBlocks.push(context.contentBlockCertifications);
                        certsIndex = context.contentBlocks.length - 1;
                      } else {
                        context.contentBlocks[certsIndex] = context.contentBlockCertifications;
                      }
                      break;
                    }
                    case ContentBlocks.Experience: {
                      for(var i = 0; i < contentBlock.sections.length; i++) {
                        var contentBlockGroup = context.getAnswers(contentBlock.sections[i], contentBlock.name, contentBlock.contentBlockGroupName);
                        if(context.contentBlockExperience) {
                          context.contentBlockExperience.ContentBlockGroups.push(contentBlockGroup);    
                        } else {   
                          context.contentBlockExperience = { ContentBlockName: contentBlock.name, CustomName: contentBlock.customName, ContentBlockGroups: [contentBlockGroup], ClassName: context.className };
                        }
                      }
                      if(isNaN(expIndex)) {
                        context.contentBlocks.push(context.contentBlockExperience);
                        expIndex = context.contentBlocks.length - 1;
                      } else {
                        context.contentBlocks[expIndex] = context.contentBlockExperience;
                      }
                      break;
                    }
                    case ContentBlocks.Education: {
                      for(var i = 0; i < contentBlock.sections.length; i++) {
                        var contentBlockGroup = context.getAnswers(contentBlock.sections[i], contentBlock.name, contentBlock.contentBlockGroupName);
                        if(!context.contentBlockEducation) {
                          context.contentBlockEducation = { ContentBlockName: contentBlock.name, CustomName: contentBlock.customName, ContentBlockGroups: [contentBlockGroup], ClassName: context.className };           
                        } else {                                       
                          context.contentBlockEducation.ContentBlockGroups.push(contentBlockGroup);   
                        }
                      }
                      if(isNaN(eduIndex)) {
                        context.contentBlocks.push(context.contentBlockEducation);
                        eduIndex = context.contentBlocks.length - 1;
                      } else {
                        context.contentBlocks[eduIndex] = context.contentBlockEducation;
                      }
                      break;
                    }
                    case ContentBlocks.Qualifications: {
                      for(var i = 0; i < contentBlock.sections.length; i++) {
                        var contentBlockGroup = context.getAnswers(contentBlock.sections[i], contentBlock.name, contentBlock.contentBlockGroupName);
                        if(!context.contentBlockQualifications) {
                          context.contentBlockQualifications = { ContentBlockName: contentBlock.name, CustomName: contentBlock.customName, ContentBlockGroups: [contentBlockGroup], ClassName: context.className };  
                        } else {                                       
                          context.contentBlockQualifications.ContentBlockGroups.push(contentBlockGroup);   
                        }
                      }
                      if(isNaN(qualIndex)) {
                        context.contentBlocks.push(context.contentBlockQualifications);
                        qualIndex = context.contentBlocks.length - 1;
                      } else {
                        context.contentBlocks[qualIndex] = context.contentBlockQualifications;
                      }
                      break;
                    }
                  }
                }
              });
            }
          }
        }
        context.spinnerService.hide();
      });
    }
  }

  getAnswers(section, contentBlockName, contentBlockGroupName) {
    var sectionAnswers = {
      ContentBlockGroupName: contentBlockGroupName,
      Answers: [],
      LicenseDate: "",
      LicenseName: "",
      LicensingBody: "",
      Location: "",
      DateRange: "",
      HoursPerX: "",
      PositionTitle: "",
      OrganizationName: "",
      EmployerName: "",
      ExperienceSummary: "",
      SkillsEntry: "",
      ResponsibilitiesEntry: "",
      AccomplishmentsEntry: "",
      AwardsEntry: "",
      DateAwarded: "",
      Awarded: "",
      DegreeProgram: "",
      AdditionalDescription: ""
    };
    var location = "", dateRange = "", hoursPerX = "", positionTitle = "", organizationName = "",
      experienceSummary = "", skillsEntry = "", responsibilitiesEntry = "", accomplishmentsEntry = "",
      awardsEntry = "", otherAwardHidden = "", dateAwarded = "", thingAwarded = "", degreeProgram = "",
      additionalDescription = "", licenseDate = "", licenseName = "", licensingBody = "",
      certifyingBody = "", certificateDate = "", employerName = "";

      section.section.answers.forEach(answer => {
        if (answer.componentName) {
          if (contentBlockName === ContentBlocks.Experience) {
  
            if (answer.componentName === "Location") {
              location = answer.value ? answer.value + ", " : "";
            }
            if (answer.componentName === "City") {
              location += answer.value ? answer.value + ", " : "";
            }
            if (answer.componentName === "StateProvince") {
              location += answer.value ? answer.value : "";
            }

            if (answer.componentName === "StateProvinceHidden") {
              location += (answer.value && answer.value.trim() !== "OtherStateProvince") ? answer.value : "";
            }

            if (answer.componentName === "StartDate") {
              dateRange = answer.value;
            }
            if (answer.componentName === "EndDate") {
              dateRange += dateRange ? (answer.value ?
                " to " + answer.value : " to Current") : "";
            }
            if (answer.componentName === "HoursPerX") {
              hoursPerX = answer.value;
            }
            if (answer.componentName === "PositionTitle") {
              positionTitle = answer.value;
            }
            if (answer.componentName === "OrganizationName") {
              organizationName = answer.value;
            }
            if (answer.componentName === "EmployerName") {
              employerName = answer.value;
            }
            if (answer.componentName === "ExperienceEntry" || answer.componentName === "ExperienceSummary") {
              experienceSummary = answer.value;
            }
            if (answer.componentName === "SkillsEntry") {
              skillsEntry = answer.value;
            }
            if (answer.componentName === "ResponsibilitiesEntry") {
              responsibilitiesEntry = answer.value;
            }
            if (answer.componentName === "AccomplishmentsEntry") {
              accomplishmentsEntry = answer.value;
            }
            if (answer.componentName === "AwardsEntry") {
              awardsEntry = answer.value;
            }
  
          } else if (contentBlockName === "Certifications") {
            
            if (answer.componentName === "LicenseName") {
              licenseName = answer.value;
            }
            if (answer.componentName === "LicensingBody") {
              licensingBody = answer.value;
            }
            if (answer.componentName === "LicenseDate") {
              licenseDate = answer.value;
            }
  
            if (answer.componentName === "CertifyingBody") {
              certifyingBody = answer.value;
            }
            if (answer.componentName === "CertificateDate") {
              certificateDate = answer.value;
            }
            return sectionAnswers;
  
          } else if (contentBlockName === "Education") {
  
            if (answer.componentName === "OrganizationName") {
              organizationName = answer.value;
            }
            if (answer.componentName === "City") {
              location = answer.value ? answer.value + ", " : "";
            }
            if (answer.componentName === "StateProvince") {
              location += (answer.value && answer.value.trim() !== "OtherStateProvince") ? answer.value : "";
            }
            if (answer.componentName === "StateProvinceHidden") {
              location += answer.value ? answer.value : "";
            }
            if (answer.componentName === "DateAwarded") {
              dateAwarded = answer.value ? answer.value : "";
            }
            if (answer.componentName === "Awarded") {
              thingAwarded = answer.value ? answer.value : "";
            }
            if (answer.componentName === "OtherAwardHidden") {
              otherAwardHidden = answer.value ? answer.value : "";
            }
            if (answer.componentName === "DegreeProgram") {
              degreeProgram = answer.value ? answer.value : "";
            }
            if (answer.componentName === "Description") {
              additionalDescription = answer.value ? answer.value : "";
            }
          }
          else {
            sectionAnswers["Answers"].push(answer.value);
          }
        }
      });
      sectionAnswers["ContentBlockGroupName"] = contentBlockGroupName;
      sectionAnswers["Location"] = location;
      sectionAnswers["DateRange"] = dateRange;
      sectionAnswers["HoursPerX"] = hoursPerX;
      sectionAnswers["PositionTitle"] = positionTitle;
      sectionAnswers["OrganizationName"] = organizationName;
      sectionAnswers["EmployerName"] = employerName;
      sectionAnswers["ExperienceSummary"] = experienceSummary;
      sectionAnswers["SkillsEntry"] = skillsEntry;
      sectionAnswers["ResponsibilitiesEntry"] = responsibilitiesEntry;
      sectionAnswers["AccomplishmentsEntry"] = accomplishmentsEntry;
      sectionAnswers["AwardsEntry"] = awardsEntry;
      sectionAnswers["ContentBlockGroupName"] = contentBlockGroupName;
      sectionAnswers["Location"] = location;
      sectionAnswers["DateAwarded"] = dateAwarded;
      sectionAnswers["Awarded"] = thingAwarded;
      sectionAnswers["OtherAwardHidden"] = otherAwardHidden;
      sectionAnswers["DegreeProgram"] = degreeProgram;
      sectionAnswers["AdditionalDescription"] = additionalDescription;
      sectionAnswers["LicenseDate"] = licenseDate;
      sectionAnswers["LicenseName"] = licenseName;
      sectionAnswers["LicensingBody"] = licensingBody;
      sectionAnswers["CertifyingBody"] = certifyingBody;
      sectionAnswers["CertificateDate"] = certificateDate;
  
      return sectionAnswers;
    } 
  
  private className(Id) {
    return Id
      .replace(/([A-Z][a-z])/g, ' $1')
      .replace(/(\d)/g, ' $1').trim()
      .replace(' ', '-').toLowerCase();
  }
}