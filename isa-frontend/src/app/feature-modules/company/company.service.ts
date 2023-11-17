import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged.results.model';
import { Company } from './model/company.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyById(companyId: number): Observable<PagedResults<Company>>{
    return this.http.get<PagedResults<Company>>(environment.apiHost + 'get/' + companyId);
  }
}
