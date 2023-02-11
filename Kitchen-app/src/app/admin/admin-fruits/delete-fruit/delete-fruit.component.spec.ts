import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFruitComponent } from './delete-fruit.component';

describe('DeleteFruitComponent', () => {
  let component: DeleteFruitComponent;
  let fixture: ComponentFixture<DeleteFruitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFruitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFruitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
