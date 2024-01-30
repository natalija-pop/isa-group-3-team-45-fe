import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Appointment, AppointmentStatus } from '../model/company.model';
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

  appointmentQrCode: File | null = null;
  customerEmail: string = "";
  appointments: Appointment[] = [];
  qrCodeAppointment: Appointment = {
    id: 0,
    start: new Date(),
    duration: 0,
    adminName: '',
    adminSurname: '',
    adminId: 0,
    customerName: '',
    customerSurname: '',
    customerId: 0,
    companyId: 0,
    status: 0,
    equipment: [],
    price: 0
  };

  showModal: boolean = false;
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
    this.getMyReservedAppointments();
  }

  getAppointmentStatusString(type: AppointmentStatus): string {
    switch (type) {
      case AppointmentStatus.predefined : return 'Predefined';
      case AppointmentStatus.scheduled : return 'Scheduled';
      case AppointmentStatus.canceled : return 'Canceled';
      case AppointmentStatus.expired : return 'Expired';
      case AppointmentStatus.processed : return "Processed";
      default: return '';
    }
  }

  hideModal(): void{
    this.showModal = false;
  }

  onQrCodeSelected(event: any): void {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      this.appointmentQrCode = fileList[0];
    } else {
      this.appointmentQrCode = null;
    }
  }

  uploadQrCode(): void{
    if(this.appointmentQrCode == null){
      alert("No QR code uploaded!");
      return;
    }
    this.companyService.ReadQrCode(this.appointmentQrCode).subscribe(
      (result: any) => {
        if(result == undefined || result == null){
          return;
        }
        this.qrCodeAppointment = result;
        this.showModal = true;
      },
      (error: any) => {
        console.error('Error while uploading QR code:', error);
        console.log(error);
      }
    )
  }

  getMyReservedAppointments(){
    this.companyService.getReservedByCompanyAdmin(this.user.id).subscribe(
      (result: any) => {
          this.appointments = result;
          this.appointments.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
      }
    );
  }

  completeReservation(appointment: Appointment) {

    appointment.status = 3;

    if (appointment.customerId !== undefined) {
      this.stakeholdersService.getUser(appointment.customerId).subscribe({
        next: (result: User) => {
          this.customerEmail = result.email;
          console.log(this.customerEmail);

          this.companyService.markAppointmentAsProcessed(appointment, this.customerEmail).subscribe(
            (result: any) => {
              let processedAppointment = result;
              if(processedAppointment.id == 0){
                alert("Oops! Something went wrong!")
                return;
              }
              else{
                let elementIndex = this.appointments.findIndex(x => x.id == result.id);
                this.appointments[elementIndex] = result;
                if(this.showModal){
                  this.hideModal();
                }
                return;
              }
            }
          )

        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}