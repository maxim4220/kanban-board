
  import {Component, OnInit} from '@angular/core';
  import {Apollo} from 'apollo-angular';
  import gql from 'graphql-tag';

  @Component({
    selector: 'app-graph-ql',
    templateUrl: './graph-ql.component.html',
    styleUrls: ['./graph-ql.component.scss']
  })
  export class GraphQlComponent implements OnInit {
    submitRepository = gql`
    mutation submitRepository {
      submitRepository(repoFullName: "apollographql/apollo-client") {
        createdAt
      }
    }
  `;
    rates = [];
    loading = true;
    error = false;
    result;
    constructor(private apollo: Apollo,) {}
     public mutate(rate) {
     console.log('rate', rate);
      this.apollo.mutate({
      mutation: this.submitRepository,
      variables: {
        repoFullName: 'apollographql/apollo-client'
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
  
    ngOnInit() {
      this.apollo
      // Set up queries.
        .watchQuery({
          query: gql`
            {
              rates(currency: "UAH") {
                currency
                rate
              }
            }
          `,
        })
        // Get the data using Observable
        .valueChanges.subscribe(result => {
          console.log('result!!', result);
          this.result = result;
          this.loading = result.loading;
          //To do: find out why the properties below cause unknown error. F.E. result.data.rates;
        });
    }
  }