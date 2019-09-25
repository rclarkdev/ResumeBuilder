import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume.component';
import { HeadingComponent } from './heading/heading.component';
import { ObjectiveComponent } from './objective/objective.component';
import { AwardsComponent } from './awards/awards.component';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { RelevantCoursesComponent } from './relevant-courses/relevant-courses.component';
import { ReferencesComponent } from './references/references.component';
import { QualificationsSummaryComponent } from './qualifications-summary/qualifications-summary.component';
import { OtherComponent } from './other/other.component';
import { CertificationsComponent } from './certifications/certifications.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ResumeComponent],
  declarations: [
    ResumeComponent,
    HeadingComponent,
    ObjectiveComponent,
    AwardsComponent,
    EducationComponent,
    SkillsComponent,
    ExperienceComponent,
    RelevantCoursesComponent,
    ReferencesComponent,
    QualificationsSummaryComponent,
    OtherComponent,
    CertificationsComponent]
})
export class ResumeModule { }
