/* tslint:disable:no-unused-variable */
import { } from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AngularFire } from 'angularfire2';


import { Firemocksvc } from '../shared/testing/firemock';
import { click } from '../shared/testing/click';
import { ThemeService } from '../shared/theme-service/theme.service';
import { SharingService } from '../shared/sharing-service/sharing.service';
import { SharingServiceMock } from '../shared/sharing-service/sharing.service.mock';

import { SharingComponent } from './sharing.component';
import { TopnavComponent } from '../topnav/topnav.component';

describe('SharingComponent', () => {
  let component: SharingComponent;
  let fixture: ComponentFixture<SharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        FormsModule,
      ],
      declarations: [
        SharingComponent,
        TopnavComponent
      ],
      providers: [
        { provide: AngularFire, useClass: Firemocksvc },
        { provide: SharingService, useClass: SharingServiceMock },
        ThemeService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
