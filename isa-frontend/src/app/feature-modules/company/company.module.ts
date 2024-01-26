import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CompaniesPageComponent } from './companies-page/companies-page.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyFormComponent } from './company-form/company-form.component';
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BarcodesPageComponent } from './barcodes-page/barcodes-page.component';



@NgModule({
  declarations: [
    CompanyProfileComponent,
    CompaniesPageComponent,
    CompanyFormComponent,
    WorkCalendarComponent,
    BarcodesPageComponent,
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    CompanyProfileComponent,
    CompaniesPageComponent,
    CompanyFormComponent
  ]
})
export class CompanyModule { }
