import {Injectable} from '@angular/core';
import {UserAuthService} from '../services/user-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private userAuthService: UserAuthService, private router: Router) {
  }

  /**
   * CanActivate.
   * Prevent unauthorized users to access the kanban-board board.
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const result = !!this.userAuthService.getSignedInUserFromStorage();
    if (!result) {
      return this.router.navigate(['/login']);
    }
    return result;
  }
}
