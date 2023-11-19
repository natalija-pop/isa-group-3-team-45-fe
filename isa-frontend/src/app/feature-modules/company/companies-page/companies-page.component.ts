import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../model/company.model';

@Component({
  selector: 'companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent implements OnInit{

  constructor(private companyService: CompanyService) {}

  name: string = '';
  city: string = '';
  rating: number | null = null;
  companies: Company[] = []; 
  searchedCompanies: Company[] = [];

  ngOnInit(): void {
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
