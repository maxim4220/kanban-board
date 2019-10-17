import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmPasswordValidator} from './confirm-password.validator';
import {UserAuthService} from '../../services/user-service.service';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
 registerForm: FormGroup;
 loading = false;
 submitted = false;
 returnUrl: string;
 error: string;
 constructor(
   private formBuilder: FormBuilder,
   private route: ActivatedRoute,
   private router: Router,
   private userAuthService: UserAuthService
 ) {
   // redirect to home if already logged in
   if (this.userAuthService.getRegisteredUsersFromStorage()) {
    // this.router.navigate(['/']);
   }
 }

 ngOnInit() {
   this.registerForm = this.formBuilder.group({
     username: ['', Validators.required],
     password: ['', Validators.required],
     confirmPassword: ['', Validators.required]
   }, {
     validator: ConfirmPasswordValidator.MatchPassword
   });
   // get return url from route parameters or default to '/'
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
 }

 // convenience getter for easy access to form fields
 get f() {
   return this.registerForm.controls;
 }

 onSubmit() {
   this.submitted = true;
   // stop here if form is invalid
   if (this.registerForm.invalid) {
     return;
   }
   this.loading = true;
   console.log('user register!', this.f.username.value, this.f.password.value);
   const user = Object.assign({username: this.f.username.value}, {password: this.f.password.value});
   console.log('user', user);
   this.userAuthService.register(user);
   this.loading = false;
   return this.router.navigate(['/login']);
 }
}