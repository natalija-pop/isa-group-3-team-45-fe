import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../model/company.model';
import { Equipment, EquipmentType } from '../model/equipment.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../../equipment/equipment.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  selectedNavItem: 'description' | 'companyInfo' | 'equipment' | 'admins' = 'description';
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
  admins: User[] = [];
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
    companyId: 0,
  }
  selectedEquipmentType: string = '';

  constructor(private companyService: CompanyService, private authService: AuthService, private route: ActivatedRoute, private equipmentService: EquipmentService) { }

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
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    profession: new FormControl('', [Validators.required]),
    companyInformation: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchValidator })

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const passwordConfirmation = group.get('passwordConfirmation')?.value;
    return password === passwordConfirmation ? null : { passwordMismatch: true };
  }

  createNewAdmin(): void {
    const admin: User = {
      id: 0,
      name: this.adminForm.value.name || "",
      surname: this.adminForm.value.surname || "",
      email: this.adminForm.value.email || "",
      password: this.adminForm.value.password || "",
      city: this.adminForm.value.city || "",
      country: this.adminForm.value.country || "",
      phone: this.adminForm.value.phone || "",
      profession: this.adminForm.value.profession || "",
      companyInformation: this.adminForm.value.companyInformation || "",
      isActivated: true,
      role: 1
    };

    if (this.adminForm.valid) {
      this.companyService.createCompanyAdmin(this.company.id, admin).subscribe({
        next: (result: any) => {
          console.log(result);
          this.admins.push(result);
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
    type: new FormControl('', [Validators.required])
  })

  createEquipment(): void {
    const equipment: Equipment = {
      id: 0,
      name: this.equipmentForm.value.name || "",
      description: this.equipmentForm.value.description || "",
      type: this.getEquipmentTypeEnum(this.equipmentForm.value.type || ""),
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
    this.equipmentService.deleteEquipment(equipment.id).subscribe((result: any) => {
      this.getEquipment(this.companyId);
    })
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
}
