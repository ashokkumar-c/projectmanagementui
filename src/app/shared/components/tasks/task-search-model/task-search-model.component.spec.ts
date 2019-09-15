import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSearchModelComponent } from './task-search-model.component';

describe('TaskSearchModelComponent', () => {
  let component: TaskSearchModelComponent;
  let fixture: ComponentFixture<TaskSearchModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSearchModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSearchModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
