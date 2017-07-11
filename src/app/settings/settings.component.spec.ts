/* tslint:disable:no-unused-variable */
import { } from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdInputModule,
  MdMenuModule,
} from '@angular/material';



import { Firemocksvc } from '../shared/testing/firemock';
import { click } from '../shared/testing/click';
import { SharingService } from '../shared/sharing-service/sharing.service';
import { SharingServiceMock } from '../shared/sharing-service/sharing.service.mock';
import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';
import { UserProfileServiceMock } from '../shared/userprofiles-service/userprofiles.service.mock';

import { SettingsComponent } from './settings.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { FooterComponent } from '../footer/footer.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MdInputModule,
        MdMenuModule,
      ],
      declarations: [
        SettingsComponent,
        TopnavComponent,
        FooterComponent,
      ],
      providers: [
        { provide: SharingService, useClass: SharingServiceMock },
        { provide: UserprofilesService, useClass: UserProfileServiceMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the username if the user has one', () => {
    let de = fixture.debugElement.query(By.css('h1'));
    let el: Element = de.nativeElement;

    expect(el.textContent).toContain('nameymcnameface');
  });

  it('should allow the user to edit their name', () => {
    let de = fixture.debugElement.query(By.css('.userdetails>button'));

    click(de);
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('md-input-container'));
    expect(de).toBeTruthy();
  });

  it('should show an input box if the user has no username', () => {
    let usersvc = fixture.debugElement.injector.get(UserprofilesService);

    usersvc.logout();
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('md-input-container'));
    expect(de).toBeTruthy();
  });
});
