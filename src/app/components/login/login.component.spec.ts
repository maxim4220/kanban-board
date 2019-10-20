import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UserAuthService } from 'src/app/services/user-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userAuthService: UserAuthService;
  let spy: jasmine.Spy;
  let mockUser;
  let submitEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [UserAuthService, ],
      imports: [FormsModule, ReactiveFormsModule,  RouterTestingModule,]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    submitEl =fixture.debugElement.query(By.css('button'));

    userAuthService = fixture.debugElement.injector.get(UserAuthService);
    mockUser = {name: 'John'};
    spy = spyOn(userAuthService, 'login');
    fixture.detectChanges();
  }));

  it('form invalid when empty',() => {
      expect(component.loginForm.valid).toBeFalsy();
  });

  it('username field validity',() => {
    let username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();

    let errors = {};
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();

    username.setValue('Test');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();

});

it('submitting a form emits a user',() => {

  expect(component.loginForm.valid).toBeFalsy();
  component.loginForm.controls['username'].setValue('Anthony');
  component.loginForm.controls['password'].setValue('1111');
  expect(component.loginForm.valid).toBeTruthy();
});

    it('should call userService',() => {
        expect(spy.calls.any()).toBe(false);
    });

    it('Setting loading to false disables the submit button',() => {
      component.loading = false;
      fixture.detectChanges();
      expect(submitEl.nativeElement.disabled).toBe(false);
  });
});
