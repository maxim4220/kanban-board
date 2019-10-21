import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getRegisteredUsersFromStorage() {
    return JSON.parse(localStorage.getItem('usersRegistered'));
  }

  getSignedInUserFromStorage() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return this.router.navigate(['/login']);

  }

  login(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return this.router.navigate(['/kanban-board']);
  }

  addFakeUsers(users) {
    return localStorage.setItem('usersRegistered', JSON.stringify(users));
  }

  register(user) {
    const users = this.getRegisteredUsersFromStorage();
    users.push(user);
    return localStorage.setItem('usersRegistered', JSON.stringify(users));
  }

}
