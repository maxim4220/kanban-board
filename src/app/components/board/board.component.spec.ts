import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import {ListComponent} from '../list/list.component';
import {DebugElement} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SummaryComponent } from '../card/card.component';
import { ContentEditDirective } from '../../directives/content-edit.directive';
import { List } from '../../models/list-model';
import { ContextMenuComponent } from '../context/context-menu.component/context-menu.component';
import { CommentsComponent } from '../helpers/comments/comments.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BoardComponent', () => {
 let component: BoardComponent;
 let fixture: ComponentFixture<BoardComponent>;

 beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ BoardComponent, ListComponent, SummaryComponent, ContentEditDirective,  ContextMenuComponent, CommentsComponent],
     imports: [FormsModule, ReactiveFormsModule, RouterTestingModule ]
   })
   .compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(BoardComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should create board component', () => {
   expect(component).toBeTruthy();
 });

 it('should render single list', () => {
   const list = new List ();
   list.name = 'Column Name';
   component.lists = [list];
   fixture.detectChanges();
   expect(component).toBeTruthy();
   const bannerDe: DebugElement = fixture.debugElement;
   const bannerEl: HTMLElement = bannerDe.nativeElement;
   expect(bannerEl.querySelectorAll('app-list')).toBeTruthy();
   expect(bannerEl.querySelectorAll('app-list').length).toEqual(1);
 });

 it('should call add list on click', () => {
   const bannerDe: DebugElement = fixture.debugElement;
   const bannerEl: HTMLElement = bannerDe.nativeElement;
   spyOn(component, 'addList');
   expect(bannerEl.querySelector('h6.add-new-list')).toBeTruthy();
   const addNewListBanner: HTMLElement = bannerEl.querySelector('h6.add-new-list');
   addNewListBanner.click();
   // alternative: addNewListBanner.dispatchEvent(new Event('click'))
   expect(component.addList).toHaveBeenCalled();
 });

 it('list should be incremented', () => {
   const bannerDe: DebugElement = fixture.debugElement;
   const bannerEl: HTMLElement = bannerDe.nativeElement;
   expect(bannerEl.querySelector('h6.add-new-list')).toBeTruthy();
   const addNewListBanner: HTMLElement = bannerEl.querySelector('h6.add-new-list');
   addNewListBanner.click();
   expect(component.lists.length).toEqual(1);
 });
});