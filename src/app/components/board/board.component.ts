import {Component, OnInit} from '@angular/core';
import {List, ListInterface} from '../../models/list-model';
import {MovementIntf} from '../../models/movement';
import {BoardModel} from '../../models/board-model';
import {LocalService} from '../../services/local-service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})

export class BoardComponent implements OnInit {

  lists: ListInterface[];
  board;

  constructor(private localService: LocalService) {
  }

  ngOnInit() {
    // ideally retrieve and initialize from some storage.
    this.board = this.localService.getBoard();
    this.lists = this.board.lists || [];
    setInterval(() => { this.saveBoard(); }, 3000);
  }

  addList() {
    const newList: ListInterface = new List();
    newList.position = this.lists.length + 1;
    newList.name = `Column #${newList.position} double click to change`;
    this.lists.push(newList);
    this.saveBoard();
  }

  moveCardAcrossList(movementInformation: MovementIntf) {
    const cardMoved = this.lists[movementInformation.fromListIdx].cards.splice(movementInformation.fromCardIdx, 1);
    this.lists[movementInformation.toListIdx].cards.splice(movementInformation.toCardIdx, 0, ...cardMoved);
    this.saveBoard();
  }

  saveBoard() {
    const boardModel = new BoardModel();
    boardModel.lists = this.lists;
    this.localService.saveBoard(boardModel);
  }

  deleteList(listIndex: number) {
    this.lists.splice(listIndex, 1);
    this.saveBoard();
  }

  removeBoard() {
    this.lists = [];
    this.saveBoard();
  }

}
