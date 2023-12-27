import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Appointment, Company } from '../model/company.model';
import { Equipment, EquipmentType } from '../model/equipment.model';
import { CompanyAdmin, User } from 'src/app/infrastructure/auth/model/user.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../../equipment/equipment.service';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  appointments: Appointment[] = [];
  selectedNavItem: 'description' | 'companyInfo' | 'equipment' | 'admins' | 'appointments' = 'description';

  company: Company = {
    id: 0,
    name: '',
    description: '',
    rating: 0,
    workingHours: {
      openingHours: '',
      closingHours: '',
      weekends: false
    },
    address: {
      street: '',
      number: 0,
      city: '',
      country: '',
      longitude: 0,
      latitude: 0,
    },
    workCalendar: []
  }
  user: User = {
    id: 0,
    role: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    city: "",
    country: "",
    phone: "",
    profession: "",
    companyInformation: "",
    isActivated: false
  };
  admins: CompanyAdmin[] = [];
  equipmentList: Equipment[] = [];
  addAdmin: boolean = false;
  editMode: boolean = false;
  companyId: number = 1;
  searchKeyword: string = '';
  searchedEquipment: Equipment[] = [];
  equipmentType: string = '';

  selectedEquipment: Equipment = {
    id: 0,
    name: "",
    description: "",
    type: 0,
    quantity: 0,
    reservedQuantity: 0,
    companyId: 0,
  }
  selectedEquipmentType: string = '';
  selectedDate: Date | null = null;
  allAppointments: Appointment[] = [];
  predefinedCompanyAppointments: Appointment[] = [];

  selectedEquipments: Equipment[] = [];
  predefinedAppointments: Appointment[] = [];
  equipmentToReserve: Equipment[] = [];
  selectedAppointment: Appointment | undefined;


  constructor( private companyService: CompanyService, private authService: AuthService, private route: ActivatedRoute, private equipmentService: EquipmentService, private stakeholdersService: StakeholdersService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = +params['id'];
    });
    this.getCompanyById(this.companyId);
    this.getEquipment(this.companyId);
    this.editMode = false;
    this.getCompanyAdmins(this.companyId);

    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.stakeholdersService.getUser(this.user.id).subscribe({
      next: (result: User) => {
        this.user = result;
        console.log(result);
      },
      error: () => {
      }
    })

    this.getPredefinedCompanyAppointments();
  }

  isSelected(equipment: Equipment): boolean {
    return this.selectedEquipments.includes(equipment);
  }

  toggleSelection(equipment: Equipment): void {
    const existingIndex = this.selectedEquipments.findIndex(selected => selected.id === equipment.id);

    if (existingIndex > -1) {
      this.selectedEquipments = this.selectedEquipments.filter(selected => selected.id !== equipment.id);
    } else {
      this.selectedEquipments = [...this.selectedEquipments, equipment];
    }
    console.log(this.selectedEquipments);
  }

  scheduleAdditionalAppointment(equipment: Equipment[]): void {
    if(this.selectedAppointment != undefined){
      const start = new Date(this.selectedAppointment.start)
      const year = start.getFullYear();
      const month = ('0' + (start.getMonth() + 1)).slice(-2);
      const day = ('0' + start.getDate()).slice(-2);

      const hours = ('0' + start.getHours()).slice(-2);
      const minutes = ('0' + start.getMinutes()).slice(-2);

      const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;
      var newAppointment: Appointment = {
        start: new Date(dateTimeString),
        duration: this.selectedAppointment.duration,
        adminName: this.selectedAppointment.adminName,
        adminSurname: this.selectedAppointment.adminSurname,
        customerName: this.user.name,
        customerSurname: this.user.surname,
        companyId: this.selectedAppointment.companyId,
        scheduled: true, 
        equipment: equipment
      };

      console.log(newAppointment)
      this.companyService.createAdditionalAppointment(newAppointment, this.user.email).subscribe({
        next: () => {}
      })
    }
  }

  onDateChange(): void {
    this.companyService.getRecommendedAppointments(this.companyId, this.selectedDate).subscribe((result: Appointment[]) => {
      this.appointments = result;
    })
  }

  getCompanyById(id: number): void {
    this.companyService.getCompanyById(id).subscribe((result: any) => {
      console.log(result);
      this.company = result;
    })
  }

  getEquipment(id: number): void {
    this.companyService.getEquipmentByCompanyId(id).subscribe((result: any) => {
      this.equipmentList = result;
      this.searchedEquipment = this.equipmentList;
    })
  }

  getCompanyAdmins(id: number): void {
    this.companyService.getCompanyAdmins(id).subscribe((result: any) => {
      this.admins = result;
    })
  }

  getEquipmentTypeString(type: EquipmentType): string {
    switch (type) {
      case EquipmentType.Instrument: return 'Instrument';
      case EquipmentType.Surgical: return 'Surgical';
      case EquipmentType.Sterile: return 'Sterile';
      case EquipmentType.Mask: return 'Mask';
      default: return '';
    }
  }

  showDescription() {
    this.selectedNavItem = 'description';
  }

  showCompanyInfo() {
    this.selectedNavItem = 'companyInfo';
  }

  showEquipment() {
    this.selectedNavItem = 'equipment';
  }

  showAdmins() {
    this.selectedNavItem = 'admins';
  }

  showAppointments() {
    this.selectedNavItem = 'appointments';
  }

  switchMode(newMode: boolean) {
    this.editMode = newMode;
  }

  saveChanges() {
    this.companyService.updateCompany(this.company).subscribe({
      next: () => { }
    })
  }

  adminForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, { validators: this.passwordMatchValidator })

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const passwordConfirmation = group.get('passwordConfirmation')?.value;
    return password === passwordConfirmation ? null : { passwordMismatch: true };
  }

  registerNewAdmin(): void {
    const admin: CompanyAdmin = {
      id: 0,
      name: this.adminForm.value.name || "",
      surname: this.adminForm.value.surname || "",
      email: this.adminForm.value.email || "",
      password: this.adminForm.value.password || "",
      isActivated: true,
      companyId: this.company.id,
      role: 1
    };

    if (this.adminForm.valid) {
      this.companyService.createCompanyAdmin(this.company.id, admin).subscribe({
        next: (result: any) => {
          console.log(result);
          this.admins.push(result);
          alert('Registration of new company admin successfull');
          this.addAdmin = false;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  equipmentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
    type: new FormControl('', [Validators.required])
  })

  createEquipment(): void {
    const equipment: Equipment = {
      name: this.equipmentForm.value.name || "",
      description: this.equipmentForm.value.description || "",
      type: this.getEquipmentTypeEnum(this.equipmentForm.value.type || ""),
      quantity: this.equipmentForm.value.quantity || 0,
      reservedQuantity: 0,
      companyId: this.companyId
    };

    if (this.equipmentForm.valid) {
      this.equipmentService.addEquipment(equipment).subscribe({
        next: (result: any) => {
          this.getEquipment(this.companyId)
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  getEquipmentTypeEnum(typeInput: string): EquipmentType {
    switch (typeInput) {
      case 'Instrument':
        return EquipmentType.Instrument;
      case 'Surgical':
        return EquipmentType.Surgical;
      case 'Sterile':
        return EquipmentType.Sterile;
      case 'Mask':
        return EquipmentType.Mask;
      default:
        return EquipmentType.Instrument;
    }
  }

  editButtonClicked(equipment: Equipment): void {
    this.selectedEquipment = equipment;
    this.selectedEquipmentType = this.getEquipmentTypeString(this.selectedEquipment.type);
  }

  updateEquipment(): void {
    this.selectedEquipment.type = this.getEquipmentTypeEnum(this.selectedEquipmentType);
    console.log(this.selectedEquipment.type);

    this.equipmentService.updateEquipment(this.selectedEquipment).subscribe({
      next: () => { }
    })
  }

  deleteEquipment(equipment: Equipment): void {
    if (equipment.id) {
      this.companyService.checkIfEquipmentCanBeDeleted(equipment.id).subscribe(
        (canBeDeleted: boolean) => {
          if (canBeDeleted) {
            alert('You successfully deleted equipment!');
            if (equipment.id) {
              this.equipmentService.deleteEquipment(equipment.id).subscribe((result: any) => {
                this.getEquipment(this.companyId);
              });
            }
          } else {
            alert('Equipment is reserved. Deletion is not possible.');
          }
        }
      );
    }
  }

  searchCompanyEquipment() {
    if (this.searchKeyword == '') {
      this.getEquipment(this.companyId);
    }
    else {
      this.companyService.getCompanyEquipmentSearchResults(this.companyId, this.searchKeyword).subscribe(
        (result: any) => {
          console.log(result)
          this.equipmentList = result;
          this.searchedEquipment = this.equipmentList;
        }
      )
    }
  }

  filterEquipmentByType() {
    if (this.equipmentType == 'All') {
      this.equipmentList = this.searchedEquipment;
    }
    else {
      this.equipmentList = this.searchedEquipment.filter(e => this.getEquipmentTypeString(e.type) == this.equipmentType);
    }
  }


  selectAppointment(appointment: Appointment) {
    this.selectedAppointment = appointment;
  }

  reserveEquipment(equipment: Equipment[]) {
    this.companyService.getCompanyAppointments(this.companyId).subscribe(
      (result: any) => {
        this.predefinedAppointments = result;
        console.log(this.selectedAppointment);
      }
    )
  }

  reserveEquipmentConfirmation(equipment: Equipment[]){
    if(this.selectedAppointment != undefined){
      this.selectedAppointment.customerName = this.user.name;
      this.selectedAppointment.customerSurname = this.user.surname;
      this.selectedAppointment.equipment = equipment;
      this.selectedAppointment.scheduled = true;
      
      this.companyService.reserveEquipment(this.selectedAppointment, this.user.email).subscribe({
        next: () => { }
      })
    }
  }

  appointmentForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    duration: new FormControl({ value: '60', disabled: true }, [Validators.required]),
    adminName: new FormControl('', [Validators.required]),
    adminSurname: new FormControl('', [Validators.required]),
  })

  createPredefinedAppointment() {
    console.log(this.appointmentForm.value.time);
    const dateTimeString = `${this.appointmentForm.value.date}T${this.appointmentForm.value.time}:00`;
    const selectedDateTime = new Date(dateTimeString);
    console.log(selectedDateTime);

    const openingTime = new Date(`2000-01-01T${this.company.workingHours.openingHours}`);
    const closingTime = new Date(`2000-01-01T${this.company.workingHours.closingHours}`);
    const appointmentTime = new Date(`2000-01-01T${this.appointmentForm.value.time}:00`);
    const appointmentDuration = 60 * 60 * 1000;
    const appointmentEndTime = new Date(appointmentTime.getTime() + appointmentDuration);

    console.log(appointmentEndTime);
    console.log(closingTime);

    if (this.appointmentForm.value.time &&
      (appointmentTime >= openingTime && appointmentEndTime <= closingTime)) {
      const appointment: Appointment = {
        start: selectedDateTime,
        duration: 60 || "",
        adminName: this.appointmentForm.value.adminName || "",
        adminSurname: this.appointmentForm.value.adminSurname || "",
        companyId: this.companyId,
        scheduled: false,
      };

      this.companyService.checkAppointmentValidity(selectedDateTime, this.companyId, this.appointmentForm.value.adminName || "", this.appointmentForm.value.adminSurname || "").subscribe(
        (isValid: boolean) => {
          if (isValid) {
            alert('You successfully defined appointment!');
            this.companyService.createPredefinedAppointment(appointment).subscribe({
              next: (result) => {
                console.log(result);
                this.getPredefinedCompanyAppointments();
              },
              error: (err) => {
                console.log(err);
              }
            });
          } else {
            alert('Appointment has already been taken and defined by you.');
          }
        }
      );
    }
    else {
      alert('Time must be in company working hours range.');
    }
  }

  getPredefinedCompanyAppointments() {
    this.companyService.getAllCompanyAppointments().subscribe((result: any) => {
      this.allAppointments = result;
      this.predefinedCompanyAppointments = this.allAppointments.filter(appointment =>
        appointment.companyId === this.companyId &&
        appointment.adminName === this.user.name &&
        appointment.adminSurname === this.user.surname
      )
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    })
  }
}