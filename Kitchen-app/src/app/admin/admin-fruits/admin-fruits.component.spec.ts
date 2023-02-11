import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFruitsComponent } from './admin-fruits.component';

describe('AdminFruitsComponent', () => {
  let component: AdminFruitsComponent;
  let fixture: ComponentFixture<AdminFruitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFruitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFruitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
