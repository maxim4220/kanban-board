import {TestBed, async, inject, tick, } from '@angular/core/testing';
import {UserAuthService} from './user-service.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {LocalService} from './local-service';
import {BoardService} from './board-service';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('AppComponent', () => {
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
  spyOn(localStorage, 'setItem')
    .and.callFake(mockLocalStorage.setItem);
  spyOn(localStorage, 'removeItem')
    .and.callFake(mockLocalStorage.removeItem);
  spyOn(localStorage, 'clear')
    .and.callFake(mockLocalStorage.clear);

    TestBed.configureTestingModule({
      providers: [
        UserAuthService,
        {provide: Router, useClass: RouterStub},
        LocalService,
        BoardService
      ],
      imports: [
        RouterTestingModule,
      ],

    }).compileComponents();
  }));

 
    it('should store the test user data correctly in localStorage', inject([UserAuthService], (service: UserAuthService) =>{
        let testUser = {username: "Sam Simons", password: 1111};
        localStorage.setItem('usersRegistered', JSON.stringify(testUser));
        expect(JSON.parse(localStorage.getItem('usersRegistered'))).toEqual(testUser);
    }));

    it('should return null when getting registered users from storage', inject([UserAuthService], (service: UserAuthService) =>{
       let res =  service.getRegisteredUsersFromStorage();
       // must be null, since no users have been added
       expect(res).toBe(null);
  }));

  it('should be equal to array of fake users if fake users are added', inject([UserAuthService], (service: UserAuthService) =>{
   let fakeUsers = [
    {username: 'John Doe', password: 1111},
    {username: 'John Smith', password: 2222},
    {username: 'Alex Alex', password: 3333},
    {username: 'Tom Smith', password: 4444},
    {username: 'Andrew Thompson', password: 5555},
    {username: 'Sam Anderson', password: 6666},
  ]; 
  service.addFakeUsers(fakeUsers);
  let res =  service.getRegisteredUsersFromStorage();
  expect(res).toEqual(fakeUsers);
  }));

  it('should create user serviceservice', inject([UserAuthService], (service: UserAuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should create board service', inject([BoardService], (service: BoardService) => {
    expect(service).toBeTruthy();
  }));

  it('should create local  service', inject([LocalService], (service: LocalService) => {
    expect(service).toBeTruthy();
  }));

  it('should return true', inject([UserAuthService], (service: UserAuthService) => {
      // expect(service.logout()).toHaveBeenCalledWith('/login');
      // tick(500);
  }));

});
