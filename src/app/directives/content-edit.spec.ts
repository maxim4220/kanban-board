import {Component} from '@angular/core';
import {ContentEditDirective} from './content-edit.directive';
import {TestBed} from '@angular/core/testing';

@Component({
  template: `
      <div appContentEditChange (changes)="output = $event"></div>`,
})
export class TestContainerComponent {
  public output: number;
}

describe('ContentEditDirective', () => {
  let container, fixture, result;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestContainerComponent, ContentEditDirective]

    });
    fixture = TestBed.createComponent(TestContainerComponent);
    container = fixture.comonentInstance;
    result = fixture.nativeElement.querySelector('div');
  });

  it('should create an instance', () => {
    const directive = new ContentEditDirective(null, null);
    expect(directive).toBeTruthy();
  });
  it('should test host listeners', () => {
    const div = fixture.nativeElement.querySelector('div');
    // div.dblclick();
    // expect(result.class).toEqual("inline-edit")
  });
});
