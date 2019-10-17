import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { SummaryComponent } from './components/card/card.component';
import { ContentEditDirective } from '../app/directives/content-edit.directive';
import { ContextMenuComponent } from './components/context/context-menu.component/context-menu.component'

@NgModule({
  declarations: [
    AppComponent,
    KanbanComponent,
    BoardComponent,
    ListComponent,
    SummaryComponent,
    ContentEditDirective,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
