import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/card-model';
import {UserAuthService} from '../../services/user-service.service';

@Component({
  selector: 'app-card-summary',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class SummaryComponent implements OnInit {
  colorArray = ['White', 'Aqua', 'GreenYellow', 'LightPink '];
  usersArray = [];
 // public assignTo = [];
 // color = '';
  @Input() card: Card;
  @Input() listIndex: number;
  @Input() cardIndex: number;

  constructor(userAuthService: UserAuthService) {
    this.usersArray = userAuthService.getRegisteredUsersFromStorage();
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
}
