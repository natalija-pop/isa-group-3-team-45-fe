import { Component } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { CompanyService } from '../company.service';
import { Company } from '../model/company.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent {
  firstStep: boolean = true;

  constructor(private authService: AuthService, private service: CompanyService) {}

  companyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl(-1, [Validators.required, Validators.pattern('[0-9]+')]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    openingHours: new FormControl(),
    closingHours: new FormControl(),
    weekends: new FormControl()
  })

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
  
  
  
   switchPage(){
    this.firstStep = !this.firstStep;
  }

  registerCompany(){
    const company: Company = {
      id: 0,
      name: this.companyForm.value.name || "",
      description: this.companyForm.value.description || "",
      rating: 0,
      address: {
        street: this.companyForm.value.street || "",
        number: this.companyForm.value.number || -1,
        city: this.companyForm.value.city || "",
        country: this.companyForm.value.country || "",
      },
      workingHours: {
        openingHours: this.companyForm.value.openingHours + ":00" || "08:00:00", //Because of backend converter
        closingHours: this.companyForm.value.closingHours + ":00" || "16:00:00",
        weekends: this.companyForm.value.weekends || false
      },
      admins: [],
      workCalendar: []
    }
  
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
    
    if(this.adminForm.valid && this.companyForm.valid){
      company.admins?.push(admin);
      console.log(company);

      this.service.createCompany(company).subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (err) => {
          console.log(err);
        } 
      });
    }  
  }
}
