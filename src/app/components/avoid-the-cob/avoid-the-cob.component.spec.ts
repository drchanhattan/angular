import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoidTheCobComponent } from './avoid-the-cob.component';

describe('AvoidTheCobComponent', () => {
  let component: AvoidTheCobComponent;
  let fixture: ComponentFixture<AvoidTheCobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvoidTheCobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvoidTheCobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
