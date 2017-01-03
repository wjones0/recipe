/* tslint:disable:no-unused-variable */
import { } from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MaterialModule, MdDialogRef } from '@angular/material';
import { AngularFire } from 'angularfire2';


import { Firemocksvc } from '../shared/testing/firemock';
import { click } from '../shared/testing/click';

import { ShareDialogComponent } from './share-dialog.component';

describe('ShareDialogComponent', () => {
  let component: ShareDialogComponent;
  let fixture: ComponentFixture<ShareDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        FormsModule,
      ],
      declarations: [
        ShareDialogComponent
      ],
      providers: [
        { provide: AngularFire, useClass: Firemocksvc },
        { provide: MdDialogRef, useClass: MockDialog }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class MockDialog {

}