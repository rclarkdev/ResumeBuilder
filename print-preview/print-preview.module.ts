import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SavedResumesComponent } from './saved-resumes/saved-resumes.component';
import { SavedCoverLettersComponent } from './saved-cover-letters/saved-cover-letters.component';
import { RouterModule } from '@angular/router';
import { PreviewCoverComponent } from './preview-cover/preview-cover.component';
import { PrintPreviewComponent } from './print-preview.component';
import { SavePrintExportComponent } from './save-print-export/save-print-export.component';
import { ResumeModule } from '../resume/resume.module';
import { CoverLetterModule } from '../cover-letter/cover-letter.module';
import { PreviewResumeComponent } from './preview-resume/preview-resume.component';
import { TranslationConfigModule } from '../../CustomWidget/shared/translation.config.module';


@NgModule({
  imports: [
    TranslationConfigModule,
    CommonModule,
    SharedModule,
    ResumeModule,
    CoverLetterModule,
    RouterModule.forRoot(
      [
        { path: 'preview-cover', component: PreviewCoverComponent },
        { path: 'preview-cover/:id', component: PreviewCoverComponent },
        { path: 'preview-resume', component: PreviewResumeComponent },
        { path: 'preview-resume/:id', component: PreviewResumeComponent },
        { path: 'saved-cover-letters', component: SavedCoverLettersComponent },
        { path: 'saved-resumes', component: SavedResumesComponent },
      ], )
  ],
  declarations: [
    SavedResumesComponent,
    SavedCoverLettersComponent,
    PreviewCoverComponent,
    PreviewResumeComponent,
    PrintPreviewComponent,
    SavePrintExportComponent,
  ]
})
export class PrintPreviewModule { }
