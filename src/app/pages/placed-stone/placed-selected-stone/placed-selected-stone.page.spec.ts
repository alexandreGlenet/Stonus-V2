import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlacedSelectedStonePage } from './placed-selected-stone.page';

describe('PlacedSelectedStonePage', () => {
  let component: PlacedSelectedStonePage;
  let fixture: ComponentFixture<PlacedSelectedStonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacedSelectedStonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlacedSelectedStonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
