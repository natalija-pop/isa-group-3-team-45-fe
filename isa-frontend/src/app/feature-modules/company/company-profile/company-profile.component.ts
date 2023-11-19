import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../model/company.model';
import { Equipment, EquipmentType } from '../model/equipment.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

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
    address: {
      street: '',
      number: 0,
      city: '',
      country: '',
    }
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

  constructor(private companyService: CompanyService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getCompanyById(1);
    this.getEquipment(1);
    this.editMode = false;
    this.getCompanyAdmins(1);

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
    })
  }

  getCompanyAdmins(id: number): void{
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

  showAdmins(){
    this.selectedNavItem = 'admins';
  }

  switchMode(newMode: boolean) {
    this.editMode = newMode;
  }

  saveChanges(){
    this.companyService.updateCompany(this.company).subscribe({
      next: () => {}
    })
  }

  adminForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl ('', [Validators.required, Validators.minLength(6)]),
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

  createNewAdmin(): void{
    const admin: User = {
      id: 0,
      name: this.adminForm.value.name || "",
      surname: this.adminForm.value.surname || "",
      email: this.adminForm.value.email || "",
      password: this.adminForm.value.password || "",
      city : this.adminForm.value.city || "",
      country: this.adminForm.value.country || "",
      phone: this.adminForm.value.phone || "",
      profession: this.adminForm.value.profession || "",
      companyInformation: this.adminForm.value.companyInformation || "",
      isActivated: true,
      role: 1
    };

    if(this.adminForm.valid){
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
}
