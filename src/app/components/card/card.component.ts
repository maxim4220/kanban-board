import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/card-model';
import {UserAuthService} from '../../services/user-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-card-summary',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class SummaryComponent implements OnInit {
  usersArray = [];
  currentUser;
  @Input() card: Card;
  @Input() listIndex: number;
  @Input() cardIndex: number;

  constructor(userAuthService: UserAuthService) {
    this.usersArray = userAuthService.getRegisteredUsersFromStorage();
    this.currentUser = userAuthService.currentUserSubject.value;
  }

  ngOnInit() {
  }

  identifyCardBeingDragged(dragEvent: DragEvent) {
    dragEvent.dataTransfer.effectAllowed = 'move';
    dragEvent.dataTransfer.dropEffect = 'move';
    const transferObject = {
      listIndex: this.listIndex,
      cardIndex: this.cardIndex
    };
    dragEvent.dataTransfer.setData('text', JSON.stringify(transferObject));
    // dragEvent.preventDefault();
  }

  allowCardDragToBeDropped(dragEvent: DragEvent) {
    dragEvent.dataTransfer.dropEffect = 'move';
    dragEvent.preventDefault();
  }

  markCompleted() {
    this.card.isCompleted = true;
    return swal.fire({
      position: 'center',
      type: 'success',
      title: 'Congratulations! The task has been completed!',
      showConfirmButton: false,
      timer: 1500
    });

  }

  addComment() {
    (async () => {
      const {value: text} = await swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Type your commnent here...',
        inputAttributes: {
          'aria-label': 'Type your comment here'
        },
        showCancelButton: true
      });
      if (text) {
        // swal.fire(text)
        if (this.card.comments) {
          this.card.comments.push({comment: text, subComments: []} );
        } else {
          this.card.comments = [];
          this.card.comments.push({comment: text, subComments: []} );
        }
      }
    })();
  }

  selectColor() {
    (async () => {
      const {value: color} = await swal.fire({
        input: 'select',
        inputOptions: {
          white: 'White',
          aqua: 'Aqua',
          greenYellow: 'GreenYellow',
          blue: 'blue'
        },
        inputPlaceholder: 'Select a color',
        showCancelButton: true,
      });
      if (color) {
        this.card.color = color;
      }
    })();
  }

  assignTicket() {
    const you = this.currentUser.username + ' ' + '(You)';
    (async () => {
      const {value: user} = await swal.fire({
        input: 'select',
        inputOptions: {
          myself: you,
          John_Doe: this.usersArray[0].username,
          JohnSmith: this.usersArray[1].username,
          John_Smith: this.usersArray[2].username,
          Tom_Smith: this.usersArray[3].username
        },
        inputPlaceholder: 'Select a user',
        showCancelButton: true,
      });
      if (user) {
        if (user === 'myself') {
          this.card.assignedTo = this.currentUser.username;
        } else {
          this.card.assignedTo = user;
        }
        return swal.fire('You have assigned this task to: ' + user);
      }
    })();
  }

  addNestedComment(comment) {  
    console.log('comment', comment);
    (async () => {
      const {value: text} = await swal.fire({
        title: 'add Review to comment',
        input: 'textarea',
        inputPlaceholder: 'Type your review for this commnent here...',
        inputAttributes: {
          'aria-label': 'Type your comment here'
        },
        showCancelButton: true
      });
      if (text) {
        if(comment.subComments) {
          comment.subComments.push(text);
        } else {
          console.log('Hello!!');
          
        }
        
      }
    })();
  }

}
