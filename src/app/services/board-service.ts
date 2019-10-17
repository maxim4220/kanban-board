import {BoardModel} from '../models/board-model';

export abstract class BoardService {
  public abstract saveBoard(board: BoardModel);

  public abstract getBoard(): BoardModel;
}
