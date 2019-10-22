import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SummaryComponent} from './card.component';
import {ContentEditDirective} from '../../directives/content-edit.directive';
import {Card} from '../../models/card-model';
import {RouterTestingModule} from '@angular/router/testing';
import {ContextMenuComponent} from '../context/context-menu.component/context-menu.component';
import {CommentsComponent} from '../helpers/comments/comments.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent,
        ContentEditDirective, ContextMenuComponent, CommentsComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    component.card = new Card('1', 'Title', 'Description', 'This is a description', 'Tony', 'not assigned', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have header', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Title');
  });
});
