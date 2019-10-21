import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserAuthService} from '../services/user-service.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SingUpGuardService {

  constructor(private userAuthService: UserAuthService, private router: Router) {
  }

  /**
   * CanActivate.
   * Prevent unauthorized users to access Sign in or Sign up pages
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const result = !this.userAuthService.getSignedInUserFromStorage();
    if (!result) {
      return this.router.navigate(['/kanban-board']);
    }
    return result;
  }
}
