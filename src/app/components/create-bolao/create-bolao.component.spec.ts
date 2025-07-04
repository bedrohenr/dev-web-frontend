import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBolaoComponent } from './create-bolao.component';

describe('CreateBolaoComponent', () => {
  let component: CreateBolaoComponent;
  let fixture: ComponentFixture<CreateBolaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBolaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBolaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
