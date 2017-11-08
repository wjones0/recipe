/* tslint:disable:no-unused-variable */
import { } from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule,
} from '@angular/material';

import { Router } from '@angular/router';

import { Firemocksvc } from '../shared/testing/firemock';
import { click } from '../shared/testing/click';
import { RouterStub } from '../shared/testing/routerstubs';
import { SharingService } from '../shared/sharing-service/sharing.service';
import { SharingServiceMock } from '../shared/sharing-service/sharing.service.mock';
import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';
import { UserProfileServiceMock } from '../shared/userprofiles-service/userprofiles.service.mock';

import { SharingComponent } from './sharing.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { FooterComponent } from '../footer/footer.component';

describe('SharingComponent', () => {
  let component: SharingComponent;
  let fixture: ComponentFixture<SharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatToolbarModule,
      ],
      declarations: [
        SharingComponent,
        TopnavComponent,
        FooterComponent,
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: SharingService, useClass: SharingServiceMock },
        { provide: UserprofilesService, useClass: UserProfileServiceMock },
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

export class MockDialog {

}