import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeoverviewComponent } from './treeoverview.component';

describe('TreeoverviewComponent', () => {
  let component: TreeoverviewComponent;
  let fixture: ComponentFixture<TreeoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
