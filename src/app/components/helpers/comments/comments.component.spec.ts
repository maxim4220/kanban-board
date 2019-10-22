import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentsComponent} from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    // Add test data to input
    component.comment = {comment: '2222', subComments: Array(0)};
    fixture.detectChanges();
  });

  it('should  create component when data to inpus is provided ', () => {
    expect(component).toBeTruthy();
  });
});
