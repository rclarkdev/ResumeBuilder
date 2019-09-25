import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { isNull, isUndefined } from 'lodash';
import { HttpClient } from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}

const translationOptions = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
};

@NgModule({
  imports: [TranslateModule.forRoot(translationOptions)],
  exports: [TranslateModule],
  providers: [TranslateService]
})
export class TranslationConfigModule {

  private browserLang;

  constructor(private translate: TranslateService) {
    // Setting up Translations
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    this.browserLang = sessionStorage.getItem("langset") ? sessionStorage.getItem("langset") : 'en';
    translate.use(this.browserLang.match(/en|es/) ? this.browserLang : 'en');
  }

  public getBrowserLang() {
    if (isUndefined(this.browserLang) || isNull(this.browserLang)) {
      this.browserLang = 'en';
    }
    return this.browserLang;
  }
}
