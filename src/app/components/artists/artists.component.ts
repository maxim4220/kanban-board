
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


const CREATE_LINK_MUTATION = gql`
  mutation updateCard($input: UpdateCardInput!,  ) {
    updateCard(input: $input,) {
      pipe_id
    }
  }
`;
//createCard
const CREATE_CARD = gql`
mutation createCard($input: CreateCardInput!) {
    createCard(input: $input) {
  card {
   id
 }
clientMutationId
  }
}
`;

const DELETE_CARD = gql`
mutation deleteCard($input: DeleteCardInput!) {
  deleteCard(input: $input) {
success
clientMutationId
  }
}
`;

const EDIT_CARD = gql`
mutation updateCard($input: UpdateCardInput!) {
  updateCard(input: $input) {
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
  
  constructor(private apollo: Apollo,private router: Router) { }

  ngOnInit() {
    this.loadKanbanData();
  }

  private loadKanbanData() {
    this.apollo
      // Set up queries.
      .watchQuery({
        query: gql`
{
  
  card(id: 43699885) { title id}me {
    id 
    name
     email 
     username 
     timeZone 
     preferences {
        browserNativeNotificationEnabled 
         displayImprovements 
          displayOrganizationReportSidebar 
           displayPipeReportsSidebar
            suggestedTemplatesClosed
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
        id
        title
        due_date
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
      this.apollo.mutate({
        mutation: CREATE_CARD,
        variables: {
          input: {
            clientMutationId: "909778",
            pipe_id: 1093139,
            title: formValues[0],
            due_date: formValues[2] ? new Date(formValues[2]).toISOString() : null
          }
        }
      }).subscribe((response) => {
         swal.fire({
          position: 'center',
          type: 'success',
          title: 'Your have Added the card',
          showConfirmButton: false,
          timer: 1500
        })
        return this.reloadComponent();
      });
    }
  }

  deleteCard(card_id) {
    this.apollo.mutate({
      mutation: DELETE_CARD,
      variables: {
        input: {
          clientMutationId: "909778",
          id: card_id,
        }
      }
    }).subscribe((response) => {
      if (response.data['deleteCard'].success) {
        swal.fire({
          position: 'center',
          type: 'success',
          title: 'Your have deleted the card!',
          showConfirmButton: false,
          timer: 1500
        })
        .then( _ => {
          return this.reloadComponent();
         })
      } else {
        return swal.fire({
          position: 'center',
          type: 'error',
          title: 'Error has occured',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }


  public async editCard(card_id){
    console.log(card_id);
    const { value: formValues } = await swal.fire({
      title: 'Add new card!',
      html:
        '<input placeholder="Change current card title" id="swal-input-title" class="swal2-input">' +
        '<input placeholder="Change current card description" id="swal-input-description" class="swal2-input">' +
        '<input type="date" placeholder="Change or add new due date" id="swal-input-date" class="swal2-input">',
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
      this.apollo.mutate({
        mutation: EDIT_CARD,
        variables: {
          input: {
            id: card_id,
            clientMutationId: "909778",
            title: formValues[0],
            due_date: formValues[2] ? new Date(formValues[2]).toISOString() : null
          }
        }
      }).subscribe((response) => {
        swal.fire({
          position: 'center',
          type: 'success',
          title: 'Your have changed the card',
          showConfirmButton: false,
          timer: 1500
        })
        .then( _ => {
          return this.reloadComponent();
         })
      });
    }
  }
  
  // temporary method to reload the component and fetch refreshed data after an update.
  // Do do: replace this method with new logic after cards have been changed.
  private reloadComponent() {
    this.router.navigate(['/']);
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/']);
  // });
  }

}
