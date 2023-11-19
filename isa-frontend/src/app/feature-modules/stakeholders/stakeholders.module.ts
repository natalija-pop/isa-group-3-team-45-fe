import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { ActivateUserComponent } from './activate-user/activate-user.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    ActivateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class StakeholdersModule { }
