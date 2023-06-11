import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnprocessedOrderComponent } from './unprocessed-order.component';

describe('UnprocessedOrderComponent', () => {
  let component: UnprocessedOrderComponent;
  let fixture: ComponentFixture<UnprocessedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnprocessedOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnprocessedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
