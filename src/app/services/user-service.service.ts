import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

 getRegisteredUsersFromStorage() {
  return JSON.parse(localStorage.getItem('usersRegistered'));
 }

 getSignedInUserFromStorage() {
  return JSON.parse(localStorage.getItem('currentUser'));
 }

 logout() {
  return localStorage.removeItem('currentUser');
 }

 login(user) {
  return localStorage.setItem('currentUser', JSON.stringify(user));
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
