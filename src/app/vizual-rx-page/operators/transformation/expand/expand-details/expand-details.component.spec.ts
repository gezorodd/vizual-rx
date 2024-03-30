import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandDetailsComponent } from './expand-details.component';

describe('ExpandDetailsComponent', () => {
  let component: ExpandDetailsComponent;
  let fixture: ComponentFixture<ExpandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
