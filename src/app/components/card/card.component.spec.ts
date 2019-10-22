import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SummaryComponent} from './card.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      // providers: [UserAuthService,],
      //  imports: [FormsModule, ReactiveFormsModule, RouterTestingModule,]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
  }));
});
