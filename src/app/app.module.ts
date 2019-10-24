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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GraphQlComponent } from './components/graph-ql/graph-ql.component';
import { GraphQLModule } from './graphql.module';
import { ArtistsComponent } from './components/artists/artists.component';


import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TokenInterceptor } from './ interceptor/interceptor.service';


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
    CommentsComponent,
    GraphQlComponent,
    ArtistsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    GraphQLModule
  ],
  providers: [
    //{provide: BrowserXhr, useClass:CustExtBrowserXhr},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
         // uri: "https://o5x5jzoo7z.sse.codesandbox.io/graphql" // Works!
      //  uri: 'https://github.com/artsy/metaphysics'
       //  uri: 'https://fakerql.com/graphql'
       // uri: 'https://api.yelp.com/v3/graphql --data'
       // uri: 'https://www.graphqlbin.com/v2/6RQ6TM'
     //  uri: 'http://graphql.nodaljs.com/graph'
    //  uri: 'https://api.graphql.jobs/'
       uri: 'https://api.pipefy.com/graphql'
        })
      }
    },
    deps: [HttpLink]
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
  
  }
}
