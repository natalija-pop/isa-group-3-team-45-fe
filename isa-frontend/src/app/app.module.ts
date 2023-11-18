import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StakeholdersModule } from './feature-modules/stakeholders/stakeholders.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { JwtInterceptor } from './infrastructure/auth/jwt/jwt.interceptor'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StakeholdersModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
