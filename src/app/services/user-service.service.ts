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
  return localStorage.removeItem('user');
 }

 login() {

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
