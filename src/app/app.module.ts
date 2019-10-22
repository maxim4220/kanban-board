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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorComponent} from './components/error/error.component';
import {CommentsComponent} from './components/helpers/comments/comments.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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
    ErrorComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({uri: '[URL]'}),
      cache: new InMemoryCache()
    });
  }
}
