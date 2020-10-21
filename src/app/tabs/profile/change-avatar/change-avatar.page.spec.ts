import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeAvatarPage } from './change-avatar.page';

describe('ChangeAvatarPage', () => {
  let component: ChangeAvatarPage;
  let fixture: ComponentFixture<ChangeAvatarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAvatarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeAvatarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
