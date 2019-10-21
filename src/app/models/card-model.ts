export interface CardInterface {
  id: string;
  header: string;
  summary: string;
  createdBy: string;
  assignedTo: string;
  color: string;
  isCompleted: boolean;
  comments?: any;
  
}

export class Card implements CardInterface {

  constructor(public id: string, public header: string, public summary: string, public createdBy: string,
              public assignedTo: string, public color: string, public isCompleted: boolean, public comments?: any) {
  }

}
