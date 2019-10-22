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
  let fixture;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestContainerComponent, ContentEditDirective]
    });
    fixture = TestBed.createComponent(TestContainerComponent);
  });

  it('should create an instance', () => {
    const directive = new ContentEditDirective(null, null);
    expect(directive).toBeTruthy();
  });
});
