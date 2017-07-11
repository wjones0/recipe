/* tslint:disable:no-unused-variable */
import { } from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdDialogModule,
  MdInputModule,
} from '@angular/material';

import { MdDialogRef } from '@angular/material';


import { Firemocksvc } from '../shared/testing/firemock';
import { click } from '../shared/testing/click';

import { ShareDialogComponent } from './share-dialog.component';

describe('ShareDialogComponent', () => {
  let component: ShareDialogComponent;
  let fixture: ComponentFixture<ShareDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MdButtonModule,
        MdDialogModule,
        MdInputModule,
      ],
      declarations: [
        ShareDialogComponent
      ],
      providers: [
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