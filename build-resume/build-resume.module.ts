import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuildResumeComponent } from './build-resume.component';
import { ChooseStyleComponent } from './choose-style/choose-style.component';
import { AddSectionsComponent } from './add-sections/add-sections.component';
import { ChooseBlocksComponent, DynamicComponent } from './choose-blocks/choose-blocks.component';
import { ModalComponent } from './modal/modal.component';
import { ChooseTypeComponent } from './choose-type/choose-type.component';
import { SharedModule } from '../shared/shared.module';
import { TranslationConfigModule } from '../shared/translation.config.module';

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
          { path: 'build-resume', component: BuildResumeComponent },
          { path: 'build-resume/:template', component: BuildResumeComponent }
      ], )],
  declarations: [
    DynamicComponent,
    BuildResumeComponent,
    ChooseStyleComponent,
    AddSectionsComponent,
    ChooseBlocksComponent,
    ModalComponent,
    ChooseTypeComponent
  ],
  entryComponents: [DynamicComponent],
  exports: [ChooseStyleComponent, ChooseBlocksComponent, ReactiveFormsModule],
})
export class BuildResumeModule { }
