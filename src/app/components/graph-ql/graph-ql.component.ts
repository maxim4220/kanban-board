
  import {Component, OnInit} from '@angular/core';
  import {Apollo} from 'apollo-angular';
  import gql from 'graphql-tag';
  
  @Component({
    selector: 'app-graph-ql',
    templateUrl: './graph-ql.component.html'
  })
  export class GraphQlComponent implements OnInit {
    rates = [];
    loading = true;
    error = false;
    result;
  
    constructor(private apollo: Apollo) {}
  
    ngOnInit() {
      this.apollo
        .watchQuery({
          query: gql`
            {
              rates(currency: "USD") {
                currency
                rate
              }
            }
          `,
        })
        .valueChanges.subscribe(result => {
          console.log('result!!', result);
          this.result = result;
          this.loading = result.loading;
          // To do: find out why the properties below cause unknown error.
         // this.rates =  result.data.rates;
          //this.error = result.error;
        });
    }
  }