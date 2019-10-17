import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAuthService} from '../../services/user-service.service';
import swal from 'sweetalert2';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const registeredUsers = this.userAuthService.getRegisteredUsersFromStorage();
    const user = Object.assign({username: this.f.username.value}, {password: this.f.password.value});
    const res = registeredUsers.find(val => val.username == user.username);
    if (res && res.password == user.password) {
      this.loading = false;
      return this.userAuthService.login(user);
    } else {
      this.loading = false;
      // User not found - show notification!!
      return swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Looks like your username or password is wrong!',
      });
    }
  }

}
