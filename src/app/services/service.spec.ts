import {TestBed, async, inject, fakeAsync, flush, tick} from '@angular/core/testing';
import { UserAuthService } from './user-service.service';
import {Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalService } from './local-service';
import { BoardService } from './board-service';

class RouterStub {
    navigateByUrl(url: string) {
      return url;
    }
  }

describe('AppComponent', () => {
    let router = {
        navigate: jasmine.createSpy('navigate')
      }
    
  beforeEach(async(() => {
      
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
  //  expect(service.logout()).toHaveBeenCalledWith('/login');
  //  tick(500);
  }));

});
