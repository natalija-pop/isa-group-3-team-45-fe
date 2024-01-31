import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../model/company.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent implements OnInit{

  constructor(private companyService: CompanyService, private authService: AuthService) {}

  name: string = '';
  city: string = '';
  rating: number | null = null;
  companies: Company[] = []; 
  searchedCompanies: Company[] = [];
  deletionPenalty: boolean = false;

  user: User = {
    id: 0,
    role: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    isActivated: false,
    penaltyPoints: 0,
  };

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    if(this.user.role === 0){
      this.companyService.checkDeletionPenaltyInCurrentMonth(this.user.id).
        subscribe((result: any) => {
          if(result === false)
            {
              if(this.user.email !== ""){
                this.companyService.clearPenaltyPointsForUser(this.user.id).
                subscribe(result => {
                  console.log('Penalty points cleared!');
                });
              }
            }   
        })  
    }

    this.getAllCompanies();
  }

  getAllCompanies(): void {
    this.companyService.getAllCompanies().subscribe((result: any) => {
      this.companies = result.results;
      this.searchedCompanies = this.companies;
    })
  }

  searchCompanies(): void {
    if(this.name == '' && this.city == ''){
      this.getAllCompanies();
    }
    else{
      this.companyService.getSearchResults(this.name, this.city).subscribe((result: any) => {
        this.companies = result;
        this.searchedCompanies = this.companies;
      })
    }
  }

  filterCompaniesByRating() {
    this.companies = this.getCompaniesByRating(this.rating);
  }

  getCompaniesByRating(rating: number | null): Company[] {
    const filteredCompanies =  this.searchedCompanies.filter(company => company.rating == this.rating);
    return filteredCompanies;
  }

}
