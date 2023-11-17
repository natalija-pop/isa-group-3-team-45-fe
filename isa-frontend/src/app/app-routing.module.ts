import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfileComponent } from './feature-modules/company/company-profile/company-profile.component';
import { HomeComponent } from './feature-modules/layout/home/home.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'company-profile', component: CompanyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
