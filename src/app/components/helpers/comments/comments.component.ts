import {Component, Input, OnInit} from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  @Input() comment;

  constructor() {
  }

  ngOnInit() {
  }

  addNestedComment(comment) {
    (async () => {
      const {value: text} = await swal.fire({
        title: 'add Review to comment',
        input: 'textarea',
        inputPlaceholder: 'Type your review for this comment here...',
        inputAttributes: {
          'aria-label': 'Type your comment here'
        },
        showCancelButton: true
      });
      if (text) {
        comment.subComments.push({comment: text, subComments: []});
      }
    })();
  }
}
