import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { CompanyAdminProfileComponent } from './company-admin-profile/company-admin-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    ActivateUserComponent,
    CompanyAdminProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StakeholdersModule { }
