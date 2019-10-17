import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-service.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  boardCreated = false;
  user: any;

  constructor(userAuthService:UserAuthService) { 
    this.user = userAuthService.getSignedInUserFromStorage();
  }

  ngOnInit() {
  }

  createBoard() {
    return this.boardCreated = this.boardCreated ? false : true;
  }

}
