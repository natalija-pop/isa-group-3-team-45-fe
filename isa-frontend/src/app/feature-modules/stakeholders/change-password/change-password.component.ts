import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { PasswordChange } from 'src/app/infrastructure/auth/model/password-change.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  changeSuccessfull: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  changePasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  changePassword(): void{
    const change: PasswordChange = {
      email: this.changePasswordForm.value.email || "",
      oldPassword: this.changePasswordForm.value.oldPassword || "",
      newPassword: this.changePasswordForm.value.newPassword || ""
    }
    if(this.changePasswordForm.valid){
      this.authService.changePassword(change).subscribe({
        next: (result) => {
          this.changeSuccessfull = result;
          if(this.changeSuccessfull){
            const timeOut = setTimeout(() => this.loginRedirect(), 3000);
          }
        }
      })
    }

  }

  loginRedirect(): void{
    this.router.navigate(['/login']);
  }

}
