import {AbstractControl} from '@angular/forms';

export class ConfirmPasswordValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      return control.get('confirmPassword').setErrors({ConfirmPassword: true});
    } else {
      control.get('confirmPassword').setErrors(null);
      return null;
    }

  }
}

