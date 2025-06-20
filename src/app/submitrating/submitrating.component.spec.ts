import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitratingComponent } from './submitrating.component';

describe('SubmitratingComponent', () => {
  let component: SubmitratingComponent;
  let fixture: ComponentFixture<SubmitratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitratingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
