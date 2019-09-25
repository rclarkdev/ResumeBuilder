import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslationConfigModule } from '../shared/translation.config.module';

@NgModule({
  imports: [
    CommonModule, RouterModule, SharedModule, TranslationConfigModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
