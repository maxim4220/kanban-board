import {async, inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {UserAuthService} from './services/user-service.service';

describe('AppComponent', () => {
  let testBedService: UserAuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [UserAuthService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([UserAuthService], (injectService: UserAuthService) => {
      testBedService = TestBed.get(UserAuthService);
      expect(injectService).toBe(testBedService);
    })
  );

  it(`should have as title 'kanban-board-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('kanban-board-app');
  });

  it('should test array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.currencies).toContain('USD');
  });

  
it('should check user property and be null by default', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  expect(app.currentUser).toBe(null);
});

it('should check user property and be defined when added', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  app.currentUser = {username: "John Doe", password: 1111};
  expect(app.currentUser.username).toEqual("John Doe");
});
});
