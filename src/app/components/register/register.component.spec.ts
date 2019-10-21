
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAuthService} from 'src/app/services/user-service.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { RegisterComponent } from './register.component';

describe('LoginComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userAuthService: UserAuthService;
  let spy: jasmine.Spy;
  let mockUser;
  let submitEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [UserAuthService,],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule,]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    submitEl = fixture.debugElement.query(By.css('button'));

    userAuthService = fixture.debugElement.injector.get(UserAuthService);
    mockUser = {name: 'John'};
    spy = spyOn(userAuthService, 'login');
    fixture.detectChanges();
  }));

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    let username = component.registerForm.controls['username'];
    expect(username.valid).toBeFalsy();

    let errors: {};
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();

    username.setValue('Test');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();

  });

  it('submitting a form emits a user', () => {

    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['username'].setValue('Anthony');
    component.registerForm.controls['password'].setValue('1111');
    // Expect to be falsy, because third input 'conform password is not filled'
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['confirmPassword'].setValue('1111');
     // Expect to be truthy since we have assigned confirmPassword the same value as password
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should call userService', () => {
    expect(spy.calls.any()).toBe(false);
  });

  it('Setting loading to false doesnts disable the submit button', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBe(false);
  });

  it('Setting loading to true disables the submit button', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBe(true);
  });

});

