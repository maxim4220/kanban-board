import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/card-model';

@Component({
  selector: 'app-card-summary',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() card: Card;
  @Input() listIndex: number;
  @Input() cardIndex: number;

  constructor() { }

  ngOnInit() {
  }

  identifyCardBeingDragged(dragEvent: DragEvent) {
    console.log('dragEvent', dragEvent);
    dragEvent.dataTransfer.effectAllowed = 'move'
    dragEvent.dataTransfer.dropEffect= 'move'
    const transferObject = {
      'listIndex' : this.listIndex,
      'cardIndex' : this.cardIndex
    };
    dragEvent.dataTransfer.setData( 'text', JSON.stringify(transferObject));
   // dragEvent.preventDefault();
  }

  allowCardDragToBeDropped(dragEvent: DragEvent) {
    dragEvent.dataTransfer.dropEffect= 'move'
    dragEvent.preventDefault();
  }
}