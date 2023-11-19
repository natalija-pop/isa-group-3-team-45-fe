import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged.results.model';
import { Equipment } from './model/equipment.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<PagedResults<Equipment>>{
    return this.http.get<PagedResults<Equipment>>(environment.apiHost + 'equipment/getAll');
  }

  getSearchResults(searchKeyword: string): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(`${environment.apiHost}equipment/getSearchResults?searchKeyword=${searchKeyword}`);
  }
}
