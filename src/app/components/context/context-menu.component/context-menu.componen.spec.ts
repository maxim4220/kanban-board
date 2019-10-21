import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAuthService} from 'src/app/services/user-service.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ContextMenuComponent} from './context-menu.component';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  let docEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContextMenuComponent],
      providers: [UserAuthService],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule,]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    docEl = fixture.debugElement.query(By.css('div'));


  }));


  it('click event', () => {
    docEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    // expect(docEl.nativeElement)
  });

});
