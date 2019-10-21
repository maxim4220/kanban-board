import {TestBed} from '@angular/core/testing';

import {SingUpGuardService} from './sing-up-guard.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('SingUpGuardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useClass: RouterStub},
        SingUpGuardService
      ],
      imports: [
        RouterTestingModule,
      ],
    }).compileComponents());

  it('should be created', () => {
    const service: SingUpGuardService = TestBed.get(SingUpGuardService);
    expect(service).toBeTruthy();
  });
});
