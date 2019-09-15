import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchModelComponent } from './user-search-model.component';

describe('UserSearchModelComponent', () => {
  let component: UserSearchModelComponent;
  let fixture: ComponentFixture<UserSearchModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
