import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomeBolaoComponent } from './outcome-bolao.component';

describe('OutcomeBolaoComponent', () => {
  let component: OutcomeBolaoComponent;
  let fixture: ComponentFixture<OutcomeBolaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutcomeBolaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutcomeBolaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
