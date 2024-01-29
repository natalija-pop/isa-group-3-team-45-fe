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
import { ChangePasswordComponent } from './feature-modules/stakeholders/change-password/change-password.component';
import { SysAdminRegistrationComponent } from './infrastructure/auth/sys-admin-registration/sys-admin-registration.component';
import { WorkCalendarComponent } from './feature-modules/company/work-calendar/work-calendar.component';
import { BarcodesPageComponent } from './feature-modules/company/barcodes-page/barcodes-page.component';
import { ReservationsPageComponent } from './feature-modules/company/reservations-page/reservations-page.component';
import { UsersProcessedReservationsComponent } from './feature-modules/company/users-processed-reservations/users-processed-reservations.component';
import { UsersScheduledReservationsComponent } from './feature-modules/company/users-scheduled-reservations/users-scheduled-reservations.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'company-profile/:id', component: CompanyProfileComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'activate', component: ActivateUserComponent },
  { path: 'companies-page', component: CompaniesPageComponent },
  { path: 'register-company', component: CompanyFormComponent },
  { path: 'company-admin-profile', component: CompanyAdminProfileComponent },
  { path: 'all-equipment', component: AllEquipmentPageComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'register-sys-admin', component: SysAdminRegistrationComponent },
  { path: 'work-calendar/:id', component: WorkCalendarComponent },
  { path: 'barcodes-page', component: BarcodesPageComponent },
  { path: 'reservations-page', component: ReservationsPageComponent },
  { path: 'users-processed-reservations', component: UsersProcessedReservationsComponent},
  { path: 'users-scheduled-reservations', component: UsersScheduledReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
