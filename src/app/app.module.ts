import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {KanbanComponent} from './components/kanban/kanban.component';
import {BoardComponent} from './components/board/board.component';
import {ListComponent} from './components/list/list.component';
import {SummaryComponent} from './components/card/card.component';
import {ContentEditDirective} from './directives/content-edit.directive';
import {ContextMenuComponent} from './components/context/context-menu.component/context-menu.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    KanbanComponent,
    BoardComponent,
    ListComponent,
    SummaryComponent,
    ContentEditDirective,
    ContextMenuComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
