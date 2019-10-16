import {Card, CardInterface} from '../models/card-model';
import {ListInterface} from '../models/list-model';

export interface BoardInterface {
  id: string;
  name: string;
  lists: ListInterface[];

}


export class BoardModel implements BoardInterface {

  id: string;
  name: string;
  lists: ListInterface[];


  constructor() {
  }

}