import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

// const uri = 'https://o5x5jzoo7z.sse.codesandbox.io/graphql'; // <-- add the URL of the GraphQL server here
  const uri = 'https://github.com/artsy/metaphysics';
// const uri= 'https://fakerql.com/graphql';
// const uri = 'https://api.yelp.com/v3/graphql --data';



export function createApollo(httpLink: HttpLink) {
  
  // return {
  //   link: httpLink.create({uri}),
  //   cache: new InMemoryCache(),
  // };
}  

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
