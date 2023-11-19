import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfileComponent } from './feature-modules/company/company-profile/company-profile.component';
import { HomeComponent } from './feature-modules/layout/home/home.component';
import { LoginComponent } from './infrastructure/auth/login/login.component';
import { RegistrationComponent } from './infrastructure/auth/registration/registration.component';
import { AuthGuard } from './infrastructure/auth/auth.guard';
import { UserProfileComponent } from './feature-modules/stakeholders/user-profile/user-profile.component';
import { ActivateUserComponent } from './feature-modules/stakeholders/activate-user/activate-user.component';
import { CompaniesPageComponent } from './feature-modules/company/companies-page/companies-page.component';
import { CompanyFormComponent } from './feature-modules/company/company-form/company-form.component';
import { CompanyAdminProfileComponent } from './feature-modules/stakeholders/company-admin-profile/company-admin-profile.component';
import { AllEquipmentPageComponent } from './feature-modules/equipment/all-equipment-page/all-equipment-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'company-profile', component: CompanyProfileComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'activate', component: ActivateUserComponent},
  {path: 'companies-page', component: CompaniesPageComponent},
  {path: 'register-company', component: CompanyFormComponent},
  {path: 'company-admin-profile', component: CompanyAdminProfileComponent},
  {path: 'all-equipment', component: AllEquipmentPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
