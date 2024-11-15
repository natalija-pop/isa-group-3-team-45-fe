import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyModule } from './feature-modules/company/company.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { MaterialModule } from './infrastructure/material/material.module';
import { JwtInterceptor } from './infrastructure/auth/jwt/jwt.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StakeholdersModule } from './feature-modules/stakeholders/stakeholders.module';
import { FormsModule } from '@angular/forms';
import { EquipmentModule } from './feature-modules/equipment/equipment.module';
import { SharedModule } from './shared/shared.module';
import { SimulatorsModule } from './feature-modules/simulators/simulators.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    EquipmentModule,
    CompanyModule,
    AuthModule,
    MaterialModule,
    StakeholdersModule,
    SimulatorsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
