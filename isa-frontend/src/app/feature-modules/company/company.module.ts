import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile/company-profile.component';



@NgModule({
  declarations: [
    CompanyProfileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompanyProfileComponent
  ]
})
export class CompanyModule { }
