import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged.results.model';
import { Company } from './model/company.model';
import { environment } from 'src/env/environment';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyById(companyId: number): Observable<PagedResults<Company>>{
    return this.http.get<PagedResults<Company>>(environment.apiHost + 'company/get/' + companyId);
  }

  getEquipmentByCompanyId(companyId: number): Observable<PagedResults<Company>>{
    return this.http.get<PagedResults<Company>>(environment.apiHost + 'equipment/getCompanyEquipment/' + companyId);
  }

  updateCompany(company: Company): Observable<Company>{
    return this.http.put<Company>(environment.apiHost + 'company/' + company.id, company);
  }

  getSearchResults(name?: string, city?: string): Observable<PagedResults<Company>> {
    return this.http.get<PagedResults<Company>>(`${environment.apiHost}company/getSearchResults?name=${name}&city=${city}`);
  }

  getAllCompanies(): Observable<PagedResults<Company>>{
    return this.http.get<PagedResults<Company>>(environment.apiHost + 'company/getAll');
  }
  
}
