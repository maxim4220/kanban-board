import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

 getUserFromStorage() {
  return JSON.parse(localStorage.getItem('user'));
 }

 logout() {
  return localStorage.removeItem('user');
 }

 login() {
 }

 register(user) {
  return localStorage.setItem('user', JSON.stringify(user));
 }

}
