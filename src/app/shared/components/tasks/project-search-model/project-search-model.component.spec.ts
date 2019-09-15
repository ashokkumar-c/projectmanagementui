import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSearchModelComponent } from './project-search-model.component';

describe('ProjectSearchModelComponent', () => {
  let component: ProjectSearchModelComponent;
  let fixture: ComponentFixture<ProjectSearchModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSearchModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSearchModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
