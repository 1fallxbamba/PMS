import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemaincontentComponent } from './homemaincontent.component';

describe('HomemaincontentComponent', () => {
  let component: HomemaincontentComponent;
  let fixture: ComponentFixture<HomemaincontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomemaincontentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomemaincontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
