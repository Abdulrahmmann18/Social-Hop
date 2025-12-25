import { UserService } from './../../services/user/user.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {

  private userService : UserService = inject(UserService);
  private router : Router = inject(Router)
  private activatedRoute : ActivatedRoute = inject(ActivatedRoute);

  changePasswordForm : FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
  })

  showPassword : WritableSignal<boolean> = signal<boolean>(false);
  showNewPassword : WritableSignal<boolean> = signal<boolean>(false);

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }
  toggleNewPassword(): void {
    this.showNewPassword.set(!this.showNewPassword());
  }
  submitForm()
  {
    if (this.changePasswordForm.valid) {
      // call signin API
      this.userService.changePassword(this.changePasswordForm.value).subscribe({
        next : (res) => { 
          console.log(res);
          localStorage.setItem("userToken", res.token);
          this.router.navigate(["../../user/home"], { relativeTo: this.activatedRoute });
        }
      })
    }
  }
}
