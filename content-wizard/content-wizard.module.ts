import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentWizardComponent } from './content-wizard.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentWizardService } from './services/content-wizard.service';
import { SharedModule } from '../shared/shared.module';
import { ContentBlockGroupsComponent } from './content-block-groups/content-block-groups.component';
import { ContentBlockFormComponent } from './content-block-form/content-block-form.component';
import { SavedBlocksComponent } from './saved-blocks/saved-blocks.component';
import { NextPrevComponent } from './next-prev/next-prev.component';
import { NavMenuComponent } from '../shared/components/nav-menu/nav-menu.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TranslationConfigModule } from '../shared/translation.config.module';
import { ContentBlocksComponent } from './content-blocks/content-blocks.component';

@NgModule({
  imports: [
    TranslationConfigModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(
      [
        { path: 'content-blocks', component: ContentBlocksComponent},
        { path: 'content-block-groups', component: ContentBlockGroupsComponent },
        { path: 'content-block-groups/:contentBlock', component: ContentBlockGroupsComponent },
        { path: 'content-wizard', component: ContentWizardComponent },
        { path: 'content-wizard/:contentBlock', component: ContentWizardComponent },
        { path: 'content-wizard/:contentBlock/:contentBlockGroupId/:contentBlockSectionId', component: ContentWizardComponent },
        { path: 'content-wizard/:contentBlock/:contentBlockGroupId', component: ContentWizardComponent }
      ])],
  declarations: [
    ContentWizardComponent,
    ContentBlockGroupsComponent,
    ContentBlockFormComponent,
    SavedBlocksComponent,
    NextPrevComponent,
    ProgressBarComponent,
    ContentBlocksComponent
  ],
  exports: [ContentWizardComponent],
  providers: [ContentWizardService, NavMenuComponent]
})
export class ContentWizardModule { }
