import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBolaoComponent } from './list-bolao.component';

describe('ListBolaoComponent', () => {
  let component: ListBolaoComponent;
  let fixture: ComponentFixture<ListBolaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBolaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBolaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
