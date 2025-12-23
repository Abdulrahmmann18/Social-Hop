import { NgClass } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {

  private authService : AuthService = inject(AuthService)
  private router : Router = inject(Router)
  
  signupForm : FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    dateOfBirth: new FormControl(null, [Validators.required, Validators.pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    gender: new FormControl(null, [Validators.pattern(/(male|female)/i)])
  }, this.validatePasswordMatch)

  showPassword : WritableSignal<boolean> = signal<boolean>(false);
  showRePassword : WritableSignal<boolean> = signal<boolean>(false);

  validatePasswordMatch(g:AbstractControl){
    if (g.get('password')?.value === g.get('rePassword')?.value) {    
      return null;
    }
    return { 'Matched' : false }
  }

  submitForm()
  {
    if (this.signupForm.valid) {
      // call signup API
      this.authService.signup(this.signupForm.value).subscribe({
        next : (res) => {
          this.router.navigate(['/signin']);
        }
      })
    }
  }

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleRePassword(): void {
    this.showRePassword.set(!this.showRePassword());
  }

}
