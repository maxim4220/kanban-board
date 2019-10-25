import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import swal from 'sweetalert2';

const CREATE_CARD = gql`
mutation createCard($input: CreateCardInput!) {
    createCard(input: $input) {
  card {
    labels {
      color
    }
   id
   title
   due_date
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
  selector: 'app-dynamic-kanban-board',
  templateUrl: './dynamic-board.component.html',
  styleUrls: ['./dynamic-board.component.scss'],
})

export class DynamicBoardComponent implements OnInit {
  public result;
  public loading = true;
  private cardPriorities = ['black', 'rgb(137, 63, 227)',]


  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.loadKanbanData();
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
        ];
      }
    });
    if (formValues) {
      this.apollo.mutate<any>({
        mutation: CREATE_CARD,
        variables: {
          input: {
            clientMutationId: '909778',
            pipe_id: 1093139,
            title: formValues[0],
            due_date: formValues[2] ? new Date(formValues[2]).toISOString() : null
          }
        }
      }).subscribe((response) => {
        if (response) {
          swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your have Added the card',
            showConfirmButton: false,
            timer: 1500
          });
          const node = Object.assign({ node: response.data.createCard.card })
          this.result.data.allCards.edges.push(node);
        } else {
          return this.errorMsg();
        }
      });
    }
  }

  deleteCard(card_id) {
    this.apollo.mutate<any>({
      mutation: DELETE_CARD,
      variables: {
        input: {
          clientMutationId: '909778',
          id: card_id,
        }
      }
    }).subscribe((response) => {
      if (response.data.deleteCard.success) {
        swal.fire({
          position: 'center',
          type: 'success',
          title: 'Your have deleted the card!',
          showConfirmButton: false,
          timer: 1500
        }).then(_ => {
          return this.result.data.allCards.edges.splice(this.result.data.allCards.edges.findIndex(item => item.id == card_id), 1)
        });
      } else {
        return this.errorMsg();
      }
    });
  }

  public async editCard(card_id) {
    const { value: formValues } = await swal.fire({
      title: 'Edit existing card!',
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
        ];
      }
    });
    if (formValues) {
      this.apollo.mutate<any>({
        mutation: EDIT_CARD,
        variables: {
          input: {
            id: card_id,
            clientMutationId: '909778',
            title: formValues[0],
            due_date: formValues[2] ? new Date(formValues[2]).toISOString() : null
          }
        }
      }).subscribe((response) => {
        if (response) {
          swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your have changed the card',
            showConfirmButton: false,
            timer: 1500
          });
          return this.reloadComponent();
        } else {
          return this.errorMsg();
        }
      });
    }
  }

  private loadKanbanData() {
    this.apollo
      .watchQuery<any>({
        query: gql`
{
  card(id: 43699885) { title id}me {
    id 
    name
     email 
     username 
     timeZone 
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
        labels{
          color
        }
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
      });
  }

  // temporary method to reload the component and fetch refreshed data after an update.
  // Do do: replace this method with new logic after cards have been changed.
  private reloadComponent() {
    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  private errorMsg() {
    return swal.fire({
      position: 'center',
      type: 'error',
      title: 'Error has occured',
      showConfirmButton: false,
      timer: 1500
    });
  }

}
