import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { CompanyAdminProfileComponent } from './company-admin-profile/company-admin-profile.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    ActivateUserComponent,
    CompanyAdminProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class StakeholdersModule { }
