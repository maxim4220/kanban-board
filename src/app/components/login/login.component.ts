import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAuthService} from '../../services/user-service.service';
import swal from 'sweetalert2';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit, OnDestroy {
 loginForm: FormGroup;
 loading = false;
 submitted = false;
 error: string;
 constructor(
   private formBuilder: FormBuilder,
   private route: ActivatedRoute,
   private router: Router,
   private userAuthService: UserAuthService
 ) {
   // redirect to home if already logged in
  //  if (this.UserAuthService.currentUserValue) {
  //      this.router.navigate(['/']);
  //  }
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

    const registeredUsers =  this.userAuthService.getRegisteredUsersFromStorage();
    const user = Object.assign({username: this.f.username.value}, {password: this.f.password.value});
    const res = registeredUsers.find(val => val.username == user.username);
    if(res && res.password == user.password) {
      this.userAuthService.login(user);
      return this.router.navigate(['/kanban-board']);
    } else {
      // User not found - show notification!!
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Looks like your username or password is wrong!',
      })
    }
 
    this.loading = false;
 }

 ngOnDestroy() {
 }

}