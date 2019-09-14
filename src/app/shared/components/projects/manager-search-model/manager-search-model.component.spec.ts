import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSearchModelComponent } from './manager-search-model.component';

describe('ManagerSearchModelComponent', () => {
  let component: ManagerSearchModelComponent;
  let fixture: ComponentFixture<ManagerSearchModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSearchModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSearchModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
