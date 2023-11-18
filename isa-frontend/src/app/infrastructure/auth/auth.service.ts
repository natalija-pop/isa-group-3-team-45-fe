import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenStorage } from './jwt/token.service';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user.model';
import { Router } from '@angular/router';
import { AuthenticationResponse } from './model/authentication-response.model';
import { Login } from './model/login.model';
import { environment } from 'src/env/environment';
import { Registration } from './model/registration.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<User>({
    id: 0,
    role: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    city: "",
    country: "",
    phone: "",
    profession: "",
    companyInformation: "",
    isActive: false});

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router) { }

  login(login: Login): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'users/login', login)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.setUser();
        })
      );
  }

  register(registration: Registration): Observable<AuthenticationResponse> {
    return this.http
    .post<AuthenticationResponse>(environment.apiHost + 'users', registration)
    .pipe(
      tap((authenticationResponse) => {
        this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
        this.setUser();
      })
    );
  }

  logout(): void {
    this.router.navigate(['/home']).then(_ => {
      this.tokenStorage.clear();
      this.user$.next({
      id: 0,
      role: "",
      email: "",
      password: "",
      name: "",
      surname: "",
      city: "",
      country: "",
      phone: "",
      profession: "",
      companyInformation: "",
      isActive: false});
      }
    );
  }

  checkIfUserExists(): void {
    const accessToken = this.tokenStorage.getAccessToken();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  private setUser(): void {
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || "";
    const user: User = {
      id: +jwtHelperService.decodeToken(accessToken).id,
      role: jwtHelperService.decodeToken(accessToken)[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ],
      email: jwtHelperService.decodeToken(accessToken).email,
      password: jwtHelperService.decodeToken(accessToken).password,
      name: jwtHelperService.decodeToken(accessToken).name,
      surname: jwtHelperService.decodeToken(accessToken).surname,
      city: jwtHelperService.decodeToken(accessToken).city,
      country: jwtHelperService.decodeToken(accessToken).country,
      phone: jwtHelperService.decodeToken(accessToken).phone,
      profession: jwtHelperService.decodeToken(accessToken).profession,
      companyInformation: jwtHelperService.decodeToken(accessToken).companyInformation,
      isActive: jwtHelperService.decodeToken(accessToken).isActive
    };
    this.user$.next(user);
  }
}

