import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagealertComponent } from './messagealert.component';

describe('MessagealertComponent', () => {
  let component: MessagealertComponent;
  let fixture: ComponentFixture<MessagealertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagealertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagealertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
