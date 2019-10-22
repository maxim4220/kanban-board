import {CardInterface} from './card-model';

export interface ListInterface {
  id: string;
  name: string;
  position: number;
  cards: CardInterface[];
}

export class List implements ListInterface {
  cards: CardInterface[] = [];
  id: string;
  name: string;
  position: number;

  constructor() {
  }
}
