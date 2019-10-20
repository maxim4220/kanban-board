import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { KanbanComponent } from './kanban.component';
import { BoardComponent } from '../board/board.component';
import { ListComponent } from '../list/list.component';
import { ContextMenuComponent } from '../context/context-menu.component/context-menu.component';
import { SummaryComponent } from '../card/card.component';
import { ContentEditDirective } from 'src/app/directives/content-edit.directive';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        KanbanComponent,
        BoardComponent,
        ListComponent,
        ContextMenuComponent,
        SummaryComponent
      ],
      providers: [ContentEditDirective]
    }).compileComponents();
  }));

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(KanbanComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });

beforeEach(async(() => {
  let  fixture = TestBed.createComponent(KanbanComponent);
  let  component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
