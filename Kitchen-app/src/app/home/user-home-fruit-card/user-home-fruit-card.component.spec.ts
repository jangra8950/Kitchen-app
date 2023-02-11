import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeFruitCardComponent } from './user-home-fruit-card.component';

describe('UserHomeFruitCardComponent', () => {
  let component: UserHomeFruitCardComponent;
  let fixture: ComponentFixture<UserHomeFruitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHomeFruitCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeFruitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
