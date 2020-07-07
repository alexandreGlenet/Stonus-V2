import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoneFoundPage } from './stone-found.page';

describe('StoneFoundPage', () => {
  let component: StoneFoundPage;
  let fixture: ComponentFixture<StoneFoundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoneFoundPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoneFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
