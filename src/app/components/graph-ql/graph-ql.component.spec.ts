import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphQlComponent } from './graph-ql.component';

describe('GraphQlComponent', () => {
  let component: GraphQlComponent;
  let fixture: ComponentFixture<GraphQlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphQlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphQlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
