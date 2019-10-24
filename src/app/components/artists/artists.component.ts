import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';


const CREATE_LINK_MUTATION = gql`
  mutation updateCard($input: UpdateCardInput!,  ) {
    updateCard(input: $input,) {
      clientMutationId
      id
      assignee_ids
      due_date
      label_ids
      title
    }
  }
`;
// https://app.pipefy.com/pipes/1093139#
// https://app.pipefy.com/graphiql
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

}
