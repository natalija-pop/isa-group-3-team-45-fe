import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEquipmentPageComponent } from './all-equipment-page.component';

describe('AllEquipmentPageComponent', () => {
  let component: AllEquipmentPageComponent;
  let fixture: ComponentFixture<AllEquipmentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllEquipmentPageComponent]
    });
    fixture = TestBed.createComponent(AllEquipmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
