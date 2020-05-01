import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchpadComponent } from './scratchpad.component';

describe('ScratchpadComponent', () => {
  let component: ScratchpadComponent;
  let fixture: ComponentFixture<ScratchpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScratchpadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScratchpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
