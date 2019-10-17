import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {UserAuthService} from '../../services/user-service.service';

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
   console.log('user login!', this.f.username.value, this.f.password.value);
    let test =  this.userAuthService.getRegisteredUsersFromStorage();
    console.log('test', test);
 }

 ngOnDestroy() {
 }

}