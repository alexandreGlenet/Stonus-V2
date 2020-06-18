import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateStonePage } from './create-stone.page';

describe('CreateStonePage', () => {
  let component: CreateStonePage;
  let fixture: ComponentFixture<CreateStonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
