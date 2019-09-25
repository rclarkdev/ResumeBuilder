import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponent } from './heading/heading.component';
import { RecipientComponent } from './recipient/recipient.component';
import { BodyComponent } from './body/body.component';
import { CoverLetterComponent } from './cover-letter.component';
import { TranslationConfigModule } from '../../CustomWidget/shared/translation.config.module';
import { IntroComponent } from './intro/intro.component';
import { ValedictionComponent } from './valediction/valediction.component';

@NgModule({
  imports: [
    TranslationConfigModule,
    CommonModule
  ],
  exports: [CoverLetterComponent],
  declarations: [HeadingComponent, RecipientComponent, BodyComponent, CoverLetterComponent, IntroComponent, ValedictionComponent]
})
export class CoverLetterModule { }
