import {Component} from '@angular/core';
import {UserAuthService} from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kanban-board-app';
  currentUser;
  currencies = ['USD', 'EUR', 'GDP']
  fakeUsers = [
    {username: 'John Doe', password: 1111},
    {username: 'John Smith', password: 2222},
    {username: 'Alex Alex', password: 3333},
    {username: 'Tom Smith', password: 4444},
    {username: 'Andrew Thompson', password: 5555},
    {username: 'Sam Anderson', password: 6666},
  ];

  constructor(private userAuthService: UserAuthService) {
   this.currentUser =  userAuthService.getSignedInUserFromStorage();
   userAuthService.currentUserSubject.subscribe(x => this.currentUser = x);
    // If there is some data in local storage - skip
    if (userAuthService.getRegisteredUsersFromStorage()) {
    } else {
      // If there are no users in local storage - add some fake users that will be used later in kanban logic.
      this.userAuthService.addFakeUsers(this.fakeUsers);
    }
  }

  logout() {
    return this.userAuthService.logout();
  }

}
