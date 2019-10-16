import {Injectable} from '@angular/core';
import {BoardModel} from '../models/board-model';
import {LocalService} from '../services/local-service';


export abstract class BoardService {
  public abstract saveBoard(board: BoardModel );

  public abstract getBoard(): BoardModel;
}