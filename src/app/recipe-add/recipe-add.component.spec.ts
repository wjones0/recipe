/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { TopnavComponent } from '../topnav/topnav.component';
import { RecipeAddComponent } from './recipe-add.component';

describe('RecipeAddComponent', () => {
  let component: RecipeAddComponent;
  let fixture: ComponentFixture<RecipeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        FormsModule
      ],
      declarations: [
        RecipeAddComponent,
        TopnavComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
