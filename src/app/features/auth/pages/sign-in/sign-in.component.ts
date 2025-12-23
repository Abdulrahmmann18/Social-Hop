import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private authService : AuthService = inject(AuthService)
  private router : Router = inject(Router)
  
  signinForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
  })

  showPassword : WritableSignal<boolean> = signal<boolean>(false);

  submitForm()
  {
    if (this.signinForm.valid) {
      // call signin API
      this.authService.signin(this.signinForm.value).subscribe({
        next : (res) => {
          console.log(res);      
          localStorage.setItem('userToken', res.token);    
          this.router.navigate(['/home']);
        }
      })
    }
  }

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }
}
