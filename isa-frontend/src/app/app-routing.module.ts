import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { RegistrationComponent } from './infrastructure/auth/registration/registration.component';
import { AuthGuard } from './infrastructure/auth/auth.guard';
import { UserProfileComponent } from './feature-modules/stakeholders/user-profile/user-profile.component';
import { ActivateUserComponent } from './feature-modules/stakeholders/activate-user/activate-user.component';

const routes: Routes = [
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'activate', component: ActivateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
