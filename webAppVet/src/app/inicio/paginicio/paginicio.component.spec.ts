import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginicioComponent } from './paginicio.component';

describe('PaginicioComponent', () => {
  let component: PaginicioComponent;
  let fixture: ComponentFixture<PaginicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
