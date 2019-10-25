import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';


const CREATE_LINK_MUTATION = gql`
  mutation updateCard($input: UpdateCardInput!,  ) {
    updateCard(input: $input,) {
      pipe_id
    }
  }
`;
//createCard
const CREATE_CARD = gql`
# mutation createCard($input: CreateCardInput!  ) {
#   createCard(input: $input) {
#     card
#     clientMutationId
#   }
# }
mutation createCard($input: CreateCardInput!) {
  # createCard(input: {clientMutationId: "909778", pipe_id: 1093139, title:"Newly created TICKET!!!!" }) {
    createCard(input: $input) {
  card {
   id
 }
clientMutationId
  }
}
`;
// https://app.pipefy.com/pipes/1093139#
// https://app.pipefy.com/graphiql
// https://api-docs.pipefy.com/reference/mutations/createCard/
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})

export class ArtistsComponent implements OnInit {
  public result;
  public loading = true;
  public country;
  private newCardTitle: string;

  constructor(private apollo: Apollo, ) { }

  ngOnInit() {
    this.loadKanbanData();
  }



  public editCard(card) {
    console.log('card', card);
    this.addNewCardTitle(card);

  }


  private loadKanbanData() {
    this.apollo
      // Set up queries.
      .watchQuery({
        query: gql`
{
  
  card(id: 43699885) { title id}me {id name email username timeZone preferences { browserNativeNotificationEnabled  displayImprovements  displayOrganizationReportSidebar  displayPipeReportsSidebar suggestedTemplatesClosed
  }
}
organizations {
  id
  name
  tables {
    edges {
      node {
        id
      }
    }
  }
  name
}

  allCards(first:10, pipeId:1093139, last: 10) {
   pageInfo {
     endCursor
     startCursor
   }
    edges {
      
      node {
        title
        expiration {
          expiredAt
          shouldExpireAt
        }
        createdBy {
          id
        }
        id
       age
        comments {
          id
        }
      }
    }
  }
  pipe(id:1093139) {
    users {
      id
    }
    cards_count
    title_field {
      id
    }
  }
}

,
        `,
      })
      .valueChanges.subscribe(result => {
        this.result = result;
        this.loading = result.loading;
        console.log('result!!!!', result);
      });
  }

  private async addNewCardTitle(card) {
    const { value: cardTitle } = await swal.fire({
      title: 'Enter new card title',
      input: 'text',
      inputPlaceholder: 'Enter new title'
    })
    if (cardTitle) {
      this.newCardTitle = cardTitle;
      swal.fire('New title is: ' + cardTitle);
      this.apollo.mutate({
        mutation: CREATE_LINK_MUTATION,
        variables: {
          input: card.id
        }
      }).subscribe((response) => {
        console.log('response', response);
      });
    }
  }

  // ADD NEW CARD!. Works.
  async addNewCard() {
    const { value: formValues } = await swal.fire({
      title: 'Add new card!',
      html:
        '<input placeholder="Enter card title" id="swal-input-title" class="swal2-input">' +
        '<input placeholder="Enter card description" id="swal-input-description" class="swal2-input">' +
        '<input type="date" placeholder="Choose a due date" id="swal-input-date" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input-title')['value'],
          document.getElementById('swal-input-description')['value'],
          document.getElementById('swal-input-date')['value']
        ]
      }
    })
    if (formValues) {
      console.log('values', formValues);
      //  let a = formValues[2].toISOString();
      let a = new Date(formValues[2]).toISOString();
      console.log('a', a);

      swal.fire(JSON.stringify(formValues));
      this.apollo.mutate({
        mutation: CREATE_CARD,
        variables: {
          input: {
            clientMutationId: "909778",
            pipe_id: 1093139,
            title: formValues[0],
            due_date: new Date(formValues[2]).toISOString()
          }
        }
      }).subscribe((response) => {
        console.log('response add new card', response);
      });
    }
  }

}
