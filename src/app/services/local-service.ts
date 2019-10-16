import { Injectable } from '@angular/core';
import {BoardService} from '../services/board-service';
import {BoardModel} from '../models/board-model';

@Injectable({
  providedIn: 'root'
})
export class LocalService extends BoardService {
 public saveBoard(board: BoardModel) {
    localStorage.setItem(`board`, JSON.stringify(board));
  }

  public getBoard(): BoardModel {
    const item = localStorage.getItem(`board`);
    return JSON.parse(item || '{}');
  }

}