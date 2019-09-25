import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChooseStyleComponent } from './choose-style/choose-style.component';
import { ChooseTypeComponent } from './choose-type/choose-type.component';
import { SharedModule } from '../shared/shared.module';
import { TranslationConfigModule } from '../shared/translation.config.module';
import { BuildCoverLetterComponent } from './build-cover-letter.component';
import { ChooseCoverComponent } from './choose-cover/choose-cover.component';

@NgModule({
  imports: [
    TranslationConfigModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
      RouterModule.forRoot(
      [
          { path: 'choose-style', component: ChooseStyleComponent },
          { path: 'choose-cover', component: ChooseCoverComponent },
          { path: 'build-cover-letter', component: BuildCoverLetterComponent },
          { path: 'build-cover-letter/:template', component: BuildCoverLetterComponent }
      ], )],
  declarations: [
    ChooseStyleComponent,
    BuildCoverLetterComponent,
    ChooseTypeComponent,
    ChooseCoverComponent
  ],
  exports: [ChooseStyleComponent, ReactiveFormsModule],
})
export class BuildCoverLetterModule { }