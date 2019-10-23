import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';

const cors = require('cors')


const query = `{
  products: allProducts(count: 25) {
    id
    name
    price
  }

  user: User(id: "wk0z1j1tzj7xc0116is3ckdrx") {
    id
    firstName
    lastName
    email
    avatar
  }
}`;

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  constructor(private apollo: Apollo,) { }

  ngOnInit() {
   
    this.apollo
    // Set up queries.
      .watchQuery({
        query: gql`
       {
      
        
  me {
    name
    email
  }

     },
        `,
        context: {
          // headers: new HttpHeaders().set("Access-Control-Allow-Headers", "*" ),
          
          // headers: new HttpHeaders().set("Access-Control-Allow-Headers", "*"),
         //Access-Control-Allow-Headers
         headers: {
           'x-access-token':'DGJpyEEdM81EtF1y111y',
           'x-user-id': '5db0599404eb690012649cb7',
           'Access-Control-Allow-Origin': '*',
           // Auth token :   DGJpyEEdM81EtF1y111y
          //'Access-Control-Allow-Headers': '*',
         // 'Access-Control-Allow-Origin': '*'
        },
        
        }
      })
      .valueChanges.subscribe(result => {
        console.log('result!!!!', result);
   
 
      });
  }
  
  }


