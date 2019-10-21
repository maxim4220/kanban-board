import {TestBed} from '@angular/core/testing';

import {AuthGuardService} from './auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('AuthGuardService', () => {
  beforeEach(() => 

  
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useClass: RouterStub},
        AuthGuardService
       
      ],
      imports: [
        RouterTestingModule,
      ],

    }).compileComponents());

  it('should be created auth guard', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
