import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ListComponent} from './list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {List} from '../../models/list-model';
import {Card} from '../../models/card-model';
import {ContentEditDirective} from '../../directives/content-edit.directive';
import {SummaryComponent} from '../card/card.component';
import {ContextMenuComponent} from '../context/context-menu.component/context-menu.component';
import {CommentsComponent} from '../helpers/comments/comments.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let nativeElement: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent,
        ContentEditDirective, SummaryComponent, ContextMenuComponent, CommentsComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    component.list = new List();
    component.list.name = 'Column Name';
    fixture.detectChanges();
    component.list.cards = [new Card('1', 'Title', 'Description', 'This is a description', 'Tony', 'not assigned', false)];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heading', () => {
    expect(component.list.name).toBeTruthy();
    expect(component.list.name).toEqual('Column Name');
  });

  it('should have cards', () => {
    expect(component.list.cards).toBeTruthy();
    expect(component.list.cards.length).toEqual(1);
  });

  it('should have add card button', () => {
    const addNewCardText = nativeElement.querySelector('.add-new-card').innerHTML;
    expect(addNewCardText).toEqual('Add new ticket...');
  });

});
