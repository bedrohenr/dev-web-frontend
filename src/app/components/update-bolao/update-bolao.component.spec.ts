import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBolaoComponent } from './update-bolao.component';

describe('UpdateBolaoComponent', () => {
  let component: UpdateBolaoComponent;
  let fixture: ComponentFixture<UpdateBolaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBolaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBolaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
