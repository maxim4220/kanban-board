import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  boardCreated = false;

  constructor() { }

  ngOnInit() {
  }

  createBoard() {
    return this.boardCreated = this.boardCreated ? false : true;
  }

}
