import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoneUpdatePage } from './stone-update.page';

describe('StoneUpdatePage', () => {
  let component: StoneUpdatePage;
  let fixture: ComponentFixture<StoneUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoneUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoneUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
