import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAdminRegistrationComponent } from './sys-admin-registration.component';

describe('SysAdminRegistrationComponent', () => {
  let component: SysAdminRegistrationComponent;
  let fixture: ComponentFixture<SysAdminRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SysAdminRegistrationComponent]
    });
    fixture = TestBed.createComponent(SysAdminRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
