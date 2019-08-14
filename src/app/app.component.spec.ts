import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {APP_BASE_HREF} from '@angular/common';
import {HeaderModule} from './header/header.module';
import {FooterModule} from './footer/footer.module';
import {Router} from '@angular/router';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {PageNotFoundModule} from './pages/page-not-found/page-not-found.module';
import {APP_INITIALIZER, DebugElement} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {setTestsLangs} from '@shared/utils/module-factories/set-test-langs.factory';
import {createTranslateLoader} from '@shared/utils/module-factories/create-translate-loader.factory';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture!: ComponentFixture<AppComponent>;
  let appComponent!: AppComponent;
  let  appDebugEl!: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HeaderModule,
        FooterModule,
        PageNotFoundModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
          }
        }),
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: PageNotFoundComponent
          }
        ]),
      ],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: setTestsLangs,
          multi: true,
          deps: [TranslateService]
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    }).compileComponents();
    const router = TestBed.get(Router);
    router.initialNavigation();
    fixture = TestBed.createComponent(AppComponent);
    fixture.changeDetectorRef.detectChanges();
  }));

  it('should create the app component', () => { // TODO: shoud create all app?
    appComponent = fixture.debugElement.componentInstance;
    expect(appComponent).toBeTruthy();
  });

  it('should have header', () => {
    appDebugEl = fixture.debugElement;
    const headerHost = appDebugEl.query(By.css('app-header'));
    expect(headerHost).toBeTruthy();
  });

  it('should have page not found component', () => {
    appDebugEl = fixture.debugElement;
    const pageNotFoundHost = appDebugEl.query(By.css('app-page-not-found'));
    expect(pageNotFoundHost).toBeTruthy();
  });

  it('should have footer', () => {
    appDebugEl = fixture.debugElement;
    const footerHost = appDebugEl.query(By.css('app-footer'));
    expect(footerHost).toBeTruthy();
  });
});
