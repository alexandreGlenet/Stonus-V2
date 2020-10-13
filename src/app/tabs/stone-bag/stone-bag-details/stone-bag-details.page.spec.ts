import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoneBagDetailsPage } from './stone-bag-details.page';

describe('StoneBagDetailsPage', () => {
  let component: StoneBagDetailsPage;
  let fixture: ComponentFixture<StoneBagDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoneBagDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoneBagDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
