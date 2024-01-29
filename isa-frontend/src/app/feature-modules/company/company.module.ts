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
import { ReservationsPageComponent } from './reservations-page/reservations-page.component';
import { UsersProcessedReservationsComponent } from './users-processed-reservations/users-processed-reservations.component';



@NgModule({
  declarations: [
    CompanyProfileComponent,
    CompaniesPageComponent,
    CompanyFormComponent,
    WorkCalendarComponent,
    BarcodesPageComponent,
    ReservationsPageComponent,
    UsersProcessedReservationsComponent,
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
