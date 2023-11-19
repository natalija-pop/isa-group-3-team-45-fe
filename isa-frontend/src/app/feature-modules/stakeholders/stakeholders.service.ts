import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class StakeholdersService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(environment.apiHost + 'user/get/' + id);
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<User>(environment.apiHost + 'user/' + user.id, user);
  }
}
