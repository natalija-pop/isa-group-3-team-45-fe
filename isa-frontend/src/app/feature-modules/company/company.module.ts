import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CompaniesPageComponent } from './companies-page/companies-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyProfileComponent,
    CompaniesPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CompanyProfileComponent,
    CompaniesPageComponent
  ]
})
export class CompanyModule { }
