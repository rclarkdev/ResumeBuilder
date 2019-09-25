import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { DatetimeComponent } from './components/form/datetime/datetime.component';
import { InputComponent } from './components/form/input/input.component';
import { RadioComponent } from './components/form/radio/radio.component';
import { SelectComponent } from './components/form/select/select.component';
import { TextareaComponent } from './components/form/textarea/textarea.component';
import { ValidationComponent } from './components/form/validation/validation.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TranslationConfigModule } from './translation.config.module';
import { HiddenComponent } from './components/form/hidden/hidden.component';
import { NavButtonComponent } from './components/form/button/nav-button.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CustomHttpInterceptorService } from './custom-http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    FormsModule, 
    TranslationConfigModule,
    CommonModule,
    RouterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TooltipModule.forRoot(),
  ],
  declarations: [
    HeaderComponent,
    NavMenuComponent,
    DatetimeComponent,
    InputComponent,
    HiddenComponent,
    RadioComponent,
    SelectComponent,
    TextareaComponent,
    NavButtonComponent,
    ValidationComponent
  ],
  exports: [
    HeaderComponent,
    NavMenuComponent,
    DatetimeComponent,
    InputComponent,
    HiddenComponent,
    RadioComponent,
    SelectComponent,
    TextareaComponent,
    NavButtonComponent,
    ValidationComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true } 
  ]
})
export class SharedModule { }
