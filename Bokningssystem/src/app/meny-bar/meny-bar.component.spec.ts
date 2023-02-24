import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenyBarComponent } from './meny-bar.component';

describe('MenyBarComponent', () => {
  let component: MenyBarComponent;
  let fixture: ComponentFixture<MenyBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenyBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenyBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
