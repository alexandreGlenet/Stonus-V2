import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlacedStonePage } from './placed-stone.page';

describe('PlacedStonePage', () => {
  let component: PlacedStonePage;
  let fixture: ComponentFixture<PlacedStonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacedStonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlacedStonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
