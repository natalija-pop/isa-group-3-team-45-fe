import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Appointment } from '../model/company.model';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';
import { CompanyAdmin, User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css']
})
export class ReservationsPageComponent implements OnInit {

  constructor(private companyService: CompanyService, private authService: AuthService, private stakeholdersService: StakeholdersService) { }

  appointments: Appointment[] = [];
  scheduledCompanyAppointments: Appointment[] = [];
  user: User = {
    id: 0,
    role: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    isActivated: false,
    penaltyPoints: 0
  };
  companyAdmin: CompanyAdmin = {
    id: 0,
    role: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    isActivated: false,
    penaltyPoints: 0,
    companyId: 0
  };

  ngOnInit(): void {

    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    if (this.user && this.user.role === 1) {
      this.stakeholdersService.getCompanyAdmin(this.user.id).subscribe({
        next: (result: CompanyAdmin) => {
          if (this.companyAdmin.companyId !== null) {
            this.companyAdmin = result;
            console.log(result);
          }
        },
        error: () => {
        }
      })
    }

    this.getScheduledCompanyAppointments();
  }

  getScheduledCompanyAppointments() {
    this.companyService.getAllCompanyAppointments().subscribe((result: any) => {
      this.appointments = result;
      this.scheduledCompanyAppointments = this.appointments.filter(appointment =>
        appointment.companyId === this.companyAdmin.companyId &&
        appointment.status === 1
      )
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    })
  }

  completeReservation(appointment: Appointment) {

    appointment.status = 3;

    if (appointment.customerId !== undefined) {
      this.stakeholdersService.getUser(appointment.customerId).subscribe({
        next: (result: User) => {
          this.user = result;
          console.log(result);

          this.companyService.markAppointmentAsProcessed(appointment, this.user.email).subscribe(
            (result: any) => {
              alert('Reservation is finished!');
              this.getScheduledCompanyAppointments();
            }
          )

        },
        error: () => {
        }
      })
    }
  }
}
